import https from 'https';

https.get('https://template.hasthemes.com/obrien/obrien/blog-details-fullwidth.html', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const imgTags = data.match(/<img [^>]*src="[^"]*"[^>]*>/g) || [];
        imgTags.slice(0, 50).forEach(tag => {
            const match = tag.match(/src="([^"]*)"/);
            if (match) console.log(match[1]);
        });
    });
}).on('error', (err) => {
    console.error(err.message);
});
