$(document).ready(function () {
    $('.navAid').on('click', function () {
        var nextSection = $(this).closest('section').next('section').offset();
        $('html, body').animate({
            scrollTop: nextSection.top
        }, 300);
    });
   var gallery = [];
        $.getJSON("js/instagramJson.json", function (data) {
            var posts = data.items;
            for (a in posts) {
                var post = posts[a],
                    vars = {};
                vars = {
                    "link": post.link,
                    "type": post.type,
                    "image": post.images.standard_resolution.url,
                    "createdTime": post.created_time,
                }
                if (post.location != null) {
                    vars.location = post.location.name;
                }
                if (post.caption != null) {
                    vars.caption = post.caption.text;
                }
                gallery.push(vars);
                if (a >= 5) {
                    break;
                }
            }
        }).then(function(){
            if (gallery.length != 0){console.log('done');
                $('.page2').after("<section class='page2b'><div class='container'></div></section>");
                
                for (b in gallery) {
                    $('.page2b').children('.container').append('<div class="image_item"><img class="insta_image" src="' + gallery[b].image + '"/><div class="image_caption">' + gallery[b].caption + '</div></div>' );
                }
            }
        });
});