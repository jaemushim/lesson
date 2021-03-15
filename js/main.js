$(function () {
    // 접근성 본문 바로가기
    $('.accessibility a').on('focus', function () {
        $(this).css('top', 0);
    });
    $('.accessibility a').focusout(function () {
        $(this).css('top', '-50px');
    });

    // GNB
    $('.nav .dept1 , .nav .wrap').hover(
        function () {
            $('.nav').addClass('active');
        },
        function () {
            $('.nav').removeClass('active');
        }
    );

    // GNB 키보드 사용성
    $('.gnb .dept1 a').on('focus', function () {
        $('.nav').addClass('on');
    });
    $('.gnb .dept2 li:last-child a').focusout(function () {
        $('.nav').removeClass('on');
    });

    // 섹션 3 (퀵메뉴 호버)
    $('.section-4 a').hover(
        function () {
            const getOrder = $(this).find('img').data('order');
            $(this).find('img').attr('src', `images/main/quick2_icon_on_${getOrder}.png`);
            $(this).find('.title').css('color', 'rgb(8, 88, 186)');
        },
        function () {
            const getOrder = $(this).find('img').data('order');
            $(this).find('img').attr('src', `images/main/quick2_icon_${getOrder}.png`);
            $(this).find('.title').css('color', '#000');
        }
    );

    // 메인 검색
    $('.nav .search').click(function () {
        $('.nav .search-open').toggleClass('open');
        $(this).toggleClass('active');
        $('.nav .search-bg').toggleClass('active');
    });

    // 서브메뉴 현재위치 클릭시
    $('.site-menu').click(function () {
        $(this).toggleClass('active');
    });

    // 자주하는 질문 탭
    $('.tab-content').css('display', 'none');
    $('.tab-link').click(function () {
        var order = $(this).data('order');
        $('.tab-content').css('display', 'none');
        $(`.tab-content:not([data-order='${order}'])`).removeClass('active');
        $('.tab-content').filter(`[data-order=${order}]`).toggleClass('active');
        $(`.tab-link:not([data-order='${order}'])`).removeClass('active');
        $(this).toggleClass('active');
    });

    // 회원가입 체크박스 중복방지
    $('.sign-input').click(function (e) {
        var obj = document.getElementsByName(e.target.name);

        for (var i = 0; i < obj.length; i++) {
            if (obj[i] != e.target) {
                obj[i].checked = false;
            }
        }
    });

    // 회원가입 체크박스 전체 선택
    $('.agree-all input').on('click', function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $(this).parents('.wrap').find('.sign-input[value="y"]').prop('checked', true);
            $(this).parents('.wrap').find('.sign-input[value="n"]').prop('checked', false);
        } else {
            $(this).parents('.wrap').find('.sign-input[value="y"]').prop('checked', false);
            $(this).parents('.wrap').find('.sign-input[value="n"]').prop('checked', true);
        }
    });
    // 메인페이지 섹션 2 슬릭
    if ($('.main .section-2 .row').length) {
        $('.main .section-2 .row').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 460,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }
    // 모바일 GNB
    $('.hamberger').click(function () {
        $('.nav .dept1').toggleClass('active');
        $('.dept2').removeClass('active');
        $('.dept3').removeClass('active');
        $('.dept1>li>a').removeClass('active');
        $('.dept2>li>a').removeClass('active');
        $('.search-bg').removeClass('active');
        $('.search').removeClass('active');
        $('.search-open').removeClass('open');
    });
    $('.dept1>li>a').click(function (e) {
        if ($(this).parents('.dept1').hasClass('active')) {
            e.preventDefault();
            const thisDept2 = $(this).parent().find('.dept2');
            const thisDept3 = $(this).parent().find('.dept3');
            $(this).parent().parent().find('.dept2.active').not(thisDept2).removeClass('active');
            $(this).parent().parent().find('.dept3.active').not(thisDept3).removeClass('active');
            $(this)
                .parent()
                .parent()
                .find('li')
                .find('a.active')
                .not($(this))
                .removeClass('active');
            $(this).toggleClass('active');
            $(this).parent().find('.dept2').toggleClass('active');
        }
    });
    $('.dept2>li>a.more').click(function (e) {
        if ($(this).parents('.dept2').hasClass('active')) {
            e.preventDefault();

            $(this).toggleClass('active');
            $(this).parent().find('.dept3').toggleClass('active');
        }
    });
    $('.close-btn').click(function () {
        $('.nav .dept1').removeClass('active');
    });

    $(window).on('resize', function () {
        var win = $(this); //this = window
        if (win.width() >= 1100) {
            $('.nav .dept1,.dept2,.dept3,.dept1>li>a,.dept2>li>a').removeClass('active');
        }
    });

    //  게시판 테이블 펼치기
    $('button.open').click(function () {
        $(this).parents('.box').find('ul').toggleClass('active');
    });
    //  자주하는질문 테이블 펼치기
    $('.box button.open').click(function () {
        $('.max-height').toggleClass('active');
    });

    // 준비중입니다.
    $('.prepare').click(function (e) {
        e.preventDefault();
        alert('준비중입니다.');
        console.log('jj');
    });

    // 서브페이지 현재 메뉴
    $('.curr .dept-1 a')
        .not($('.dept-2 > li > a,.home'))
        .on('click', function (e) {
            e.preventDefault();
            $('.curr .dept-1>li').not($(this).parent()).removeClass('active');
            $(this).parent().toggleClass('active');
        });
});
//게시판 컨텐츠 최대 글자수
function fnChkByte(obj, maxByte) {
    var str = obj.value;
    var str_len = str.length;
    var rbyte = 0;
    var rlen = 0;
    var one_char = '';
    var str2 = '';

    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 2;
        } else {
            rbyte++;
        }

        if (rbyte <= maxByte) {
            rlen = i + 1;
        }
    }

    if (rbyte > maxByte) {
        alert('글내용은 최대 ' + maxByte + 'byte를 초과할 수 없습니다.');
        str2 = str.substr(0, rlen);
        obj.value = str2;
        fnChkByte(obj, maxByte);
    } else {
        document.getElementById('byteInfo').innerText = rbyte;
    }
}

// 비밀번호 유효성 체크
function passCheck() {
    var p1 = document.getElementById('pwd1').value;
    var p2 = document.getElementById('pwd2').value;

    var chk = 0;
    if (p2.search(/[0-9]/g) != -1) chk++;
    if (p2.search(/[a-z]/gi) != -1) chk++;
    if (p2.search(/[!@#$%^&*()?_~]/g) != -1) chk++;

    if (!/^[a-zA-Z0-9!@#$%^&*()?_~]{8,20}$/.test(p2)) {
        document.getElementById('pwdAlert').innerHTML =
            '※ 비밀번호는 숫자, 영문, 특수문자 조합으로 8~20자리를 사용해야 합니다.';
        document.getElementById('pwd2').style.border = '2px solid #f44336 ';
    } else if (chk < 2) {
        document.getElementById('pwdAlert').innerHTML =
            '※ 비밀번호는 숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다.';
        document.getElementById('pwd2').style.border = '2px solid #f44336 ';
    } else {
        if (p1 != p2) {
            document.getElementById('pwdAlert').innerHTML =
                '※ 입력한 두 개의 비밀번호가 서로  일치하지 않습니다.';
            document.getElementById('pwd2').style.border = '2px solid #f44336 ';
        } else {
            document.getElementById('pwdAlert').innerHTML = '※ 비밀번호가 일치합니다.';
        }
    }
}
