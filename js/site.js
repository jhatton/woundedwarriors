$(function () {
    // this calls the jfollow plugin to follow the cart when it moves down the page
    $('#scart').jfollow('#cartfollow', 20);
	
	
    // this hides the cart button, and sets total=0
    var emptyCart = $('.emptycart');
    var clrCart = $('#clearcart');
    clrCart.hide();
    var total = 0;

    // this functions sets up the drag function and the helper function
    $(".productitem").draggable({
        revert: true,
        cursorAt: {
            top: -12,
            left: -20
        },
        zindex: -1,
        helper: function (event, ui) {
            var itemNumber = $(this).find("h6").text();
            var itemName = $(this).find(".itemname").text();
            var itemPrice = $(this).find(".listprice").text();
            return $('<div class="phelper"><br>' + itemName + "<br>" + itemNumber + "<br>" + itemPrice + "<br>" + '<div>');
        }
    });

    // this drops the products to be dropped to the cart 
    $(".cartdropbox").droppable({
        tolerance: "touch",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ".productitem",
        drop: function (event, ui) {
            var item = $(ui.draggable).find(".itemname").text();
            var itemid = $(ui.draggable).find("h6").text();
            var price = $(ui.draggable).find(".listprice").text();

            // this writes the html to the page for the shopping cart 
            var html = '<div class="cartitem" data-productid="' + itemid + '">';
			console.log(itemid, item, price);
            html = html + '<span class="ui-state-default trashitem"><span class="ui-icon ui-icon-trash"></span></span>';
            html = html + '<span class="title">' + itemid + '</span>';
            html = html + '<span class="name">' + item + '</span>';
            html = html + '<input type="text" class="amount" value="1" />';
            html = html + '<span class="price">' + price + '</span><div class="clear"></div>';

            // adds the product and checks to see if the item is already listed and adds to the quantity, is not the adds the product.  
            var cartitem = $('".cartitem[data-productid="' + itemid + '"]"');
			
            if (cartitem.length > 0) {
                var int = parseInt(cartitem.find('input').val());
                int++;
                cartitem.find('input').val(int);
				
            } else {
                var content = $('.cartitem');
                content.append(html);
                emptyCart.fadeOut();
            }
            // updates total items in cart
            total++;
            if (total > 0) {
                clrCart.show();
            }
        }
    });

    // this functions sets up the dialog control and clears the products from the cart 
    $('#clearcart').click(function () {
        var dialogBox = $('<span>Are you sure you want to erase your cart?</span>');
        dialogBox.dialog({
            resizable: false,
            title: "Empty Your Cart",
            modal: true,
            buttons: {
                Cancel: function () {
                    $(this).dialog('close');
                },
                "OK": function () {
                    var content = $('.cartitems');
                    content.remove();
                    location.reload();
                    $(this).dialog('close');
                }

            }

        });
        return false;
    });

    // delete items from the shopping cart
    $(document).on('click', '.trashitem', function () {
        $(this).closest(".cartitem").remove();
        // update total item
        total--;
        if (total === 0) {
            clrCart.fadeIn('500');
            emptyCart.fadeOut('500');
        }

    });
});