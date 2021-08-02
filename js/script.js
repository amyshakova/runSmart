$(document).ready(function(){

  // carousel

    $('.carousel__iner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron_right.png"></img></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                autoplay: true,
                autoplaySpeed: 1500
              }
            },

          ]
    });

    //tabs
    
    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('section.catalog').find('div.catalog__contant').removeClass('catalog__contant_active').eq($(this).index()).addClass('catalog__contant_active');
    });

    function toggleSlide (item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog__item-contant').eq(i).toggleClass('catalog__item-contant_active');
          $('.catalog__item-more').eq(i).toggleClass('catalog__item-more_active');
        })
      });
    };

    toggleSlide('.catalog__item-contant');
    toggleSlide('.catalog__item-more');

    //modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.catalog__btn').each(function(i) {
      $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    //validate form
    
    function validateForm(form){
      $(form).validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: 'Введите свое имя!',
          phone: 'Введите номер телефона!',
          email: {
            required: 'Введите свою почту!',
            email: 'Неправильно введен почтовій адрес!'
          }
        }
      })
    };

    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    //phone mask

    $('input[name=phone]').mask("+380-99-999-9999");

    //post email

    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
    });
});