/**
 * Created with JetBrains WebStorm.
 * User: tangledupinblue
 * Date: 2013/04/20
 * Time: 3:52 PM
 * To change this template use File | Settings | File Templates.
 * test
 */
function Litecart() {
    this.lineItems = [];
    //this.postToUrl = "";
    this.currency = "$";
//    this.firstNamePostId = "firstName";
//    this.lastNamePostId = "lastName";
//    this.emailPostId = "email";
//    this.orderInfoPostId = "orderDetails";
//    this.additionalPostParams = [];
    this.imageDirectory = "";
    //this.postFormId = "userData";
    this.addItem = function(item, price) {
        var itemFound = false;
        for (index = 0; index < this.lineItems.length; ++index) {
            if (this.lineItems[index].item.toString() == item.toString()) {
                console.log("found {0}".format(item));
                itemFound = true;
                this.lineItems[index].qty += 1;
            }
        }
        if (!itemFound) {
            var newLineItem = new LitecartLineItem(item,1,price);
            console.log("added {0}".format(item));
            this.lineItems.push(newLineItem);
        }
    };

    this.removeItem = function(item) {
        for (index = 0; index < this.lineItems.length; ++index) {
            var lineItem = this.lineItems[index];
            if (lineItem.item.toString() == item.toString()) {
                console.log("removing {0}".format(lineItem.item));
                if (lineItem.qty > 1)
                {
                    lineItem.qty -= 1;
                }
                else
                {
                    this.lineItems.splice(index,1);
                }
            }
        }
    };

    this.toTable = function() {
        var tbl = "<table>";
        var priceSummer = 0;
        tbl += "<tr><th>Item</th><th style=\"width:20px\"></th><th>Qty</th><th>Price</th><th></th></tr>";
        for (index = 0; index < this.lineItems.length; ++index) {
            var li = this.lineItems[index];
            tbl += "<tr><td>{0}</td><td></td><td style=\"text-align:right\">{1}</td><td style=\"text-align:right\">{3} {2}</td>".format(
                            li.item, li.qty, li.price.toFixed(2), this.currency);
            tbl += "<td><input type=\"image\" id=\"{0}+\" src=\"{2}add.gif\" onclick=\"addToCart('{0}',{1})\">".format(li.item, li.price, this.imageDirectory);
            tbl += "<input type=\"image\" id=\"{0}-\" src=\"{1}remove.png\" onclick=\"removeFromCart('{0}')\"></td>".format(li.item, this.imageDirectory);
            tbl += "</tr>";
            priceSummer += li.qty * li.price;
        }
        tbl += "<tr><td>TOTAL</td><td></td><td>{1} {0}</td>".format(priceSummer.toFixed(2), this.currency);
//        tbl += "<td><input type=\"image\" id=\"order\" src=\"order.gif\" onclick=\"enterContactDetails()\"</td></tr>";
//        tbl += "<td><input type=\"image\" id=\"order\" src=\"order.gif\" onclick=\"setControlValuesOnForm()\"</td></tr>";
          //tbl += "<td><input type=\"button\" id=\"order\" onclick=\"setControlValuesOnForm()\"</td></tr>";
        tbl += "<td></td>";
        tbl += "</table>";
        return tbl;
    };

//    this.generateDetailsForm = function() {
//        var tbl = "<form accept-charset=utf-8 enctype=\"multipart/form-data\" method=\"POST\"><table>";
//        tbl += "<tr><td colspan='2'>Please enter details and Send</td></tr>";
//        tbl += "<tr><td>First Name</td><td>Last Name</td></tr>";
//        tbl += "<tr><td><input type=\"text\" id=\"{0}\" /></td>".format(this.firstNamePostId);
//        tbl += "<td><input type=\"text\" /></td></tr>".format(this.lastNamePostId);
//        tbl += "<tr><td colspan='2'>Email</td></tr>";
//        tbl += "<tr><td colspan='2'><input type=\"text\" id=\"{0}\" /></td></tr>".format(this.emailPostId);
//        tbl += "<tr><td><input type=\"image\" id=\"cancel-\" src=\"cancel.gif\" onclick=\"refreshCart()\" /></td>";
////        tbl += "<td><input type=\"image\" id=\"send-\" src=\"send.gif\" formaction=\"{0}\" /></td></tr>".format(this.postToUrl);
////        tbl += "<td><input type=\"image\" id=\"send-\" src=\"send.gif\" onclick=\"{0}\" /></td></tr>".format("setControlValuesOnForm()");
//        tbl += "<td><input type=\"button\" id=\"send-\" onclick=\"{0}\" /></td></tr>".format("setControlValuesOnForm()");
////        tbl += "<td><input type=\"button\" id=\"send-\" onclick=\"{0}\" /></td></tr>".format("setTextValue('WASSUP')");
//        tbl += "</table>";
//        tbl += "<hidden id=\"{0}\" value=\"{1}\" />".format(this.orderInfoPostId, this.toText());
//        var postParams = JSON.parse(this.additionalPostParams);
////        for (index = 0; index < postParams.; ++index) {
////            var nextParam = this.additionalPostParams[index];
////            console.log("<hidden id=\"{0}\" value=\"{1}\" />".format(nextParam[0],nextParam[1]));
////        }
//        for(var propt in postParams){
//            console.log("<hidden id=\"{0}\" value=\"{1}\" />".format(propt,postParams[propt]));
//        }
//        tbl += "</form>";
//        return tbl;
//    };
    
    this.toText = function() {
        var txt = "";
        var priceSummer = 0;
        //txt += "ItemQtyPrice\n";
        for (index = 0; index < this.lineItems.length; ++index) {
            var li = this.lineItems[index];
            txt += "{0} x{1} at {2} each\n".format(
                li.item.toString().padRight(15," "), li.qty.toString().padLeft(4," "), (this.currency + " " + li.price.toFixed(2)).padLeft(10," "));
            priceSummer += li.qty * li.price;
        }
        txt += "Total Order Value of {1}{0}\n".format(priceSummer, this.currency);
        return txt;
    };
}

function LitecartLineItem(item, qty, price) {
    this.qty = qty;
    this.item = item;
    this.price = price;
    return this;
}

function clearCart() {
    console.log("clear cart");
    cart.lineItems.splice(0,cart.lineItems.length);
    sessionStorage.setItem("litecart",JSON.stringify(cart));
}

function refreshCart() {
    var cartdiv = document.getElementById("cart");
    cartdiv.innerHTML = cart.toTable();
    sessionStorage.setItem("litecart",JSON.stringify(cart));
}

function enterContactDetails() {
    var cartdiv = document.getElementById("cart");
    cartdiv.innerHTML = cart.generateDetailsForm();
}

function addToCart(item,price) {
    console.log(item);
    cart.addItem(item,price);
    refreshCart();
}

function removeFromCart(item) {
    cart.removeItem(item);
    refreshCart();
}

function setControlValuesOnForm(inputControlId) {
    var targetEl = document.getElementById(inputControlId);
    console.log("writing to: " + targetEl.id);
    targetEl.value = cart.toText();
}

//formatting strings
//first, checks if it isn't implemented yet
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

//padding strings
if (!String.prototype.padLeft) {
    String.prototype.padLeft = function(len, fillWith) {
        var fillLen = len - this.length;
        if (fillLen > 0) {
            return repeatString(fillWith,fillLen) + this;
        } else {
            return this.substr(0,len);
        }
    }
}

//padding strings
if (!String.prototype.padRight) {
    String.prototype.padRight = function(len, fillWith) {
        var fillLen = len - this.length;
        if (fillLen > 0) {
            return this + repeatString(fillWith,fillLen);
        } else {
            return this.substr(0,len);
        }
    }
}

function repeatString(repeat, numberTimes) {
    var repeated = "";
    for(var i = 0; i < numberTimes; i++) {
        repeated += repeat;
    }
    return repeated;
}

//helper function to clone a given object instance
function copyObject(from, to) {
    for (var key in from) {
        //copy all the fields
        to[key] = from[key];
    }
}

function getCurrentFilePath() {
    var scriptEls = document.getElementsByTagName( 'script' );
    var thisScriptEl = scriptEls[scriptEls.length - 1];
    var scriptPath = thisScriptEl.src;
    alert(scriptPath);
    return scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
}

//console.log( [scriptPath, scriptFolder] );

console.log("starting litecart");
try {
    var obj = JSON.parse(sessionStorage.getItem("litecart"));
}
catch (e) {
}
var cart = new Litecart();
if (obj != null) {
    copyObject(obj,cart);
}

console.log(JSON.stringify(cart));



