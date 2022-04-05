var check = false;

function changeVal(el) {
    var qt = parseFloat(el.parents(".c-bag-qty").children("li").children('.qt').html());
    var price = parseFloat(el.parents(".table-cell").children(".price").html());
    var eq = Math.round(price * qt * 100) / 100;

    el.parents(".product").children(".col-price").children('.table-cell').children(".full-price").html(eq + "đ");

    changeTotal();
}

function changeTotal() {

    var price = 0;

    $(".full-price").each(function (index) {
        price += parseFloat($(".full-price").eq(index).html());
    });

    price = Math.round(price * 100) / 100;
    var tax = Math.round(price * 0.05 * 100) / 100
    var shipping = parseFloat($(".shipping span").html());
    var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

    if (price == 0) {
        fullPrice = 0;
    }

    $(".subtotal span.she-fr").html(price);
    $(".tax span").html(tax);
    $(".total span").html(fullPrice);
}

$(document).ready(function () {

    $(".remove").click(function (e) {
        e.preventDefault();
        var el = $(this);
        el.parents('.product').addClass("removed");
        window.setTimeout(
            function () {
                el.parents('.product').slideUp('fast', function () {
                    el.parents('.product').remove();
                    if ($(".product").length == 0) {
                        if (check) {
                            $("#cart").html("<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this Pen on <a href='https://codepen.io/ziga-miklic/pen/xhpob'>CodePen</a>. Thank you!</p>");
                        } else {
                            $("#cart").html("<h1>No products!</h1>");
                        }
                    }
                    changeTotal();
                });
            }, 200);
    });

    $(".qt-plus").click(function () {
        $(this).parents(".c-bag-qty").children("li").children('.qt').html(parseInt($(this).parents(".c-bag-qty").children("li").children('.qt').html()) + 1);
        if(parseInt($(".qt").html()) >1){
            $("span.qt-minus").css('opacity','1')
        }

        var el = $(this);
        window.setTimeout(function () {changeVal(el); }, 150);
    });

    $(".qt-minus").click(function () {

        child = $(this);

        if (parseInt(child.parents(".c-bag-qty").children("li").children('.qt').html()) > 1) {
            child.parents(".c-bag-qty").children("li").children('.qt').html(parseInt(child.parents(".c-bag-qty").children("li").children('.qt').html()) - 1);
        }
        if (parseInt(child.parents(".c-bag-qty").children("li").children('.qt').html()) == 1) {
            $("span.qt-minus").css('opacity','.3')
        }

        $(this).parent().children(".full-price").addClass("minused");

        var el = $(this);
        window.setTimeout(function () { el.parent().children(".full-price").removeClass("minused"); changeVal(el); }, 150);
    });

    window.setTimeout(function () { $(".is-open").removeClass("is-open") }, 1200);

    // $(".btn").click(function () {
    //     check = true;
    //     $(".remove").click();
    // });
});