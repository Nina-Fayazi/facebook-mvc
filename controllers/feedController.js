const Feed = require('../models/Feed');


exports.getAllFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find().sort({ createdAt: -1 });
        res.render('index', { feeds, error: null });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.createFeed = async (req, res) => {
    try {
        const { name, message } = req.body;
        const newFeed = new Feed({ name, message });
        await newFeed.save();
        res.redirect('/feed');
    } catch (err) {
        // اگر ولیدیشن خطا داد، دوباره صفحه را با پیام خطا رندر می‌کنیم
        const feeds = await Feed.find().sort({ createdAt: -1 });
        res.render('index', { feeds, error: err.message });
    }
};


exports.getFeedById = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) return res.status(404).send('Post not found');
        res.render('show', { feed });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.getEditPage = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) return res.status(404).send('Post not found');
        res.render('edit', { feed, error: null });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.updateFeed = async (req, res) => {
    try {
        const { name, message } = req.body;
      
        await Feed.findByIdAndUpdate(
            req.params.id, 
            { name, message }, 
            { runValidators: true, new: true }
        );
        
        res.redirect(`/feed/${req.params.id}`);
    } catch (err) {
        const feed = await Feed.findById(req.params.id);
        res.render('edit', { feed, error: err.message });
    }
};


exports.deleteFeed = async (req, res) => {
    try {
        await Feed.findByIdAndDelete(req.params.id);
       
        res.redirect('/feed');
    } catch (err) {
        res.status(500).send('Server Error');
    }
};