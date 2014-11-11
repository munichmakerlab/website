/**
 * @constructor
 * @param {jQuery} container
 * @param {string} url
 * @param {integer} count
 */
function TumblrRSS(container, url, count) {
    this.container = container;
    this.url       = url;
    this.count     = count;
}

/**
 * @return {undefined}
 */
TumblrRSS.prototype.start = function(callback) {
    this.fetchFeed(callback);
}

/**
 * @return {undefined}
 */
TumblrRSS.prototype.fetchFeed = function(callback) {
    /**
     * @type {!TumblrRSS}
     */
    var that = this;
    
    $.ajax({
        url: that.url + 'api/read/json?',
        dataType: 'script',
        success:  function(data) {
            that.handleResponse(tumblr_api_read);
			callback();
        }
    });
}

/**
 * @param {!Object.<{Object}>}
 * @return {undefined}
 */
TumblrRSS.prototype.handleResponse = function(response) {
    
    /**
     * @type {!TumblrRSS}
     */
    var that = this;
    
    var feed = response['posts'],
        html = [],
        i    = 0;
    
    for ( var post in feed ) {
        if ( i === that.count ) {
            break;
        }
        
        var obj    = feed[post],
            type   = obj['type'];
        
        obj['date'] = obj['date'].replace(/(\d\d:\d+:\d+)/, '');
        
        var markup = that.getMarkup(obj, type);

        if ( markup === '' ) {
            continue;
        }
        
        html.push('<div class="mod"><div class="inner">' + markup + '</div></div>');
        
        i++;
    }
    
    html = html.join('');
    
    this.container.html(html);
    
}

/**
 * @param {Object} post
 * @param {string} type
 * @return {string}
 */
TumblrRSS.prototype.getMarkup = function(post, type) {
    /**
     * @type {!TumblrRSS}
     */
    var that = this;
    
    var markup = '';
    
    switch( type ) {
        case 'photo':   markup = that.getPhotoMarkup(post);
            break;
        case 'quote':   markup = that.getQuoteMarkup(post);
            break;
        case 'link':    markup = that.getLinkMarkup(post);
            break;
        case 'regular': markup = that.getRegularMarkup(post);
            break;
        case 'audio':   markup = that.getAudioMarkup(post);
            break;
        case 'video':   markup = that.getVideoMarkup(post);
            break;
        default:break;
    }
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getPhotoMarkup = function(post) {
    var markup  = [],
        caption = post['photo-caption'];
    
	markup.push('<div class="post-preview">');
	if (post.photos.length > 0) {
		markup.push('<div class="rslides_container">');
		markup.push('<ul class="rslides">');
		post.photos.forEach(function(photo){
			markup.push('<li><img class="image" src="' + photo['photo-url-500'] + '"></li>');
		});
		markup.push('</ul>');
		markup.push('</div>');
	} else {
		markup.push('<div class="image_container"><img class="image" src="' + post['photo-url-500'] + '"></div>');
	}
    markup.push('<p>' + caption + '</p>');
    markup.push('<p class="post-meta">Posted on ' + post['date'] + ' - <a target="_blank" href="' + post['url-with-slug'] + '">View on Tumblr</a></p>');
    markup.push('</div><hr>');
    markup = markup.join('');
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getQuoteMarkup = function(post) {
    var markup = [];

    markup.push('<h4>' + post['date'] + '</h4>');
    markup.push('<blockquote><p>' + post['quote-text'] + '</p></blockquote>');
    markup.push('<p><a target="_blank" href="' + post['url-with-slug'] + '">View The Post</a></p>');
    
    markup = markup.join('');
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getLinkMarkup = function(post) {
    var markup = [];
    
    markup.push('<h4>' + post['date'] + '</h4>');
    markup.push('<p><a target="_blank" href="' + post['link-url'] + '">' + post['link-text'] + '</a></p>');
    markup.push('<p>' + post['link-description'] + '</p>');
    markup.push('<p><a target="_blank" href="' + post['url-with-slug'] + '">View The Post</a></p>');
    
    markup = markup.join('');
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getRegularMarkup = function(post) {
    var markup = [];
    
    markup.push('<h4>' + post['date'] + '</h4>');
    markup.push('<p>' + post['regular-body'] + '</p>');
    markup.push('<p><a target="_blank" href="' + post['url-with-slug'] + '">View The Post</a></p>');
    
    markup = markup.join('');
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getAudioMarkup = function(post) {
    var markup = [],
        player = post['audio-player'];
    
    markup.push('<h4>' + post['date'] + '</h4>');
    markup.push(post['audio-caption']);
    markup.push(player);
    markup.push('<p><a target="_blank" href="' + post['url-with-slug'] + '">View The Post</a></p>');
    
    markup = markup.join('');
    
    return markup;
}

/**
 * @param {Object} post
 * @return {string}
 */
TumblrRSS.prototype.getVideoMarkup = function(post) {
    
    var markup = [],
        id     = post['id'],
        source = post['video-source'],
        player = post['video-player'],
        orientation = 'portrait',
        portrait    = 'true'
        //width       = source.match(/"width";i:(\d+)/)[1],
        //height      = source.match(/"height";i:(\d+)/)[1],
        //frames      = player.match(/poster=(.*)/)
		;
        
        
    if ( !source.match(/portrait/) ) {
        orientation = 'landscape';
        portrait = 'false';
    }
    markup.push('<div class="post-preview">');
	markup.push(player);    
    markup.push('<p>' + post['video-caption'] + '</p>');
    markup.push('<p class="post-meta">Posted on ' + post['date'] + ' - <a target="_blank" href="' + post['url-with-slug'] + '">View on Tumblr</a></p>');
    markup.push('</div><hr>');
    markup = markup.join('');
    
    return markup;
}

