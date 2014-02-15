function change_search(){
	var text = $(this).text();
	var place = $(this).data('place');

	$('.dropdown a').first().text(text);
	$('#place').attr('value', place);
	return false;
};

function expand()
{
    if($('.categories').height()==20)
    {
    $('.categories').height('auto');
    $(this).addClass('btn-open');
    $('.glyphicon-plus').addClass('bar');
    $('.glyphicon-plus').addClass('glyphicon-minus');
    }else
    {
    $('.categories').height('20px');
    $(this).removeClass('btn-open');
    $('.glyphicon-plus').removeClass('bar');
    $('.glyphicon-plus').removeClass('glyphicon-minus');
    }
}

function incDec() {
    	$('.inc_image').unbind('click');
	$('.inc_image').click(
			function() {
                                if ($(this).parent().prev().val()!="") {
				$(this).parent().prev().val(parseInt($(this).parent().prev().val())+1);
                                }
			}
			);
	$('.dec_image').unbind('click');
	$('.dec_image').click(
			function() {
				if (parseInt($(this).parent().prev().val())-1>=0)
				{
					$(this).parent().prev().val(parseInt($(this).parent().prev().val())-1);
				}
			}
			);
        $('.product_close').unbind('click');
        $('.product_close').click(function(){
            $(this).parent().parent().fadeToggle(1000);
        }
        );
        $('.author_close').unbind('click');
        $('.author_close').click(function(){
            $(this).parent().fadeToggle(1000);
        }
        );

}

$(document).ready(function(){
	$('.dropdown-menu a').click(change_search);
        $('.plus_button').click(expand);
        incDec();
        $.fn.raty.defaults.path = 'files/images';
         $('.star').raty({
              click: function(score, evt) {
                    alert('efazati:'+'ID: ' + $(this).attr('id') + "\nscore: " + score + "\nevent: " + evt);
                },
                score: function() {
                    return $(this).attr('data-score');
               }
        });
});
