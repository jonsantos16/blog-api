const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog', function() {
    before(function() {
        return runServer();
    });
    after(function() {
        return closeServer();
    });
    it('should list blog posts on GET', function() {
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.above(0);
                res.body.forEach(function(item) {
                    expect(item).to.be.a('object');
                    expect(item).to.have.all.keys('id', 'title', 'content', 'publishDate', 'author');
                });
            });
    });
    it('should post blog posts on POST', function() {
        const newBlogPost = {
            title: 'Do not be a bloodhound',
            content: 'If Thou shouldst call me to resign what most I prize, it neer was mine, I  only yield Thee what was Thine: Thy will be done',
            author: 'Jonathan Santos, taken from Jim Elliot',
            publishDate: 'July 10, 2018'
        }
        return chai.request(app)
            .post('/blog-posts')
            .send(newBlogPost)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'title', 'content', 'publishDate', 'author')
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(Object.assign(newBlogPost, {id: res.body.id}));
            });    
    });
    it('should update blog posts on PUT', function() {
        const updateBlogPost = {
            title: 'Tardigrades',
            content: 'Cool, tough, & cute?',
            author: 'Jonathan Santos',
            publishDate: 'July 10, 2018'
        }
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                updateBlogPost.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updateBlogPost.id}`)
                    .send(updateBlogPost)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
    });
    it('should delete blog posts on DELETE', function() {
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
    })
})