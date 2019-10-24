//makes focus go on name field first
$("#name").focus();
//hides the theme option
$("#other-title").hide();

//shows or hides depending if other is selected or not
$("#title").change(function() {
  if ($("#title").val() === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

//give user choice of color depending what design they chose
let $colors = $("#color option");
let colorOption = $colors.eq().text();
$("#design").change(function() {
  if ($("#design option:selected").val() === "js puns") {
    $("#colors-js-puns").show();
    $("#color").html(
      '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>'
    );
  } else if ($("#design option:selected").val() === "heart js") {
    $("#colors-js-puns").show();
    $("#color").html(
      '<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'
    );
  }
});

//register for activities section
let activitiesArray = [];
let totalCost;
const $activities = $("#activities");
$(".activities").on("click", function() {
  var total = 0;
  if ($("input[name='all']").is(":checked")) {
    total += 200; //adds up the cost if selected
  }
  if ($("input[name='js-frameworks']").is(":checked")) {
    total += 100; //adds up the cost if selected
    $("input[name='express']").attr("disabled", true);
  } else {
    $("input[name='express']").attr("disabled", false);
  }
  if ($("input[name='js-libs']").is(":checked")) {
    total += 100; //adds up the cost if selected
    $("input[name='node']").attr("disabled", true);
  } else {
    $("input[name='node']").attr("disabled", false);
  }
  if ($("input[name='express']").is(":checked")) {
    total += 100; //adds up the cost if selected
    $("input[name='js-frameworks']").attr("disabled", true);
  } else {
    $("input[name='js-frameworks']").attr("disabled", false);
  }
  if ($("input[name='node']").is(":checked")) {
    total += 100; //adds up the cost if selected
    $("input[name='js-libs']").attr("disabled", true);
  } else {
    $("input[name='js-libs']").attr("disabled", false);
  }

  if ($("input[name=build-tools]").is(":checked")) {
    total += 100; //adds up the cost if selected
  }
  if ($("input[name=npm]").is(":checked")) {
    total += 100; //adds up the cost if selected
  }
  totalPrice(total);
});
// total price gets displayed
function totalPrice(total) {
  if (typeof total !== 0) {
    $("#totalDiv").remove();
    $(".activities").append("<div id='totalDiv'>Total : $" + total + "</div>");
  } else {
    $("#totalDiv").remove();
  }
}

// credit card is selected first
const creditCard = $("#credit-card");

// shows and hides payment option according to users payment preference
$("#payment").on("change", function() {
  $(this)
    .children()
    .eq(0)
    .hide();
  if ($(this).val() === "credit card") {
    creditCard.show();
    payPal.hide();
    bitcoin.hide();
  }
  if ($(this).val() === "paypal") {
    creditCard.hide();
    payPal.show();
    bitcoin.hide();
  }
  if ($(this).val() === "bitcoin") {
    creditCard.hide();
    payPal.hide();
    bitcoin.show();
  }
});

// Hide select payment method option
$("#payment")[0].selectedIndex = $(
  '#payment option[value = "credit card"]'
).index();

//hides paypal and bitcoin initially
const payPal = $("#credit-card").next();
payPal.hide();
const bitcoin = $("#credit-card")
  .next()
  .next();
bitcoin.hide();

// Main validation function
const masterVal = () => {
  if (isValidName() && isValidEmail() && checked() && isValidPayment()) {
    return true;
  }
  return false;
};
// Main Validation event listener
$("button").on("click", function(event) {
  if (masterVal()) {
  } else {
    event.preventDefault();
    nameVal();
    emailVal();
    checked();
    cardVal();
  }
});

//function for name
const isValidName = () => {
  const name = $("#name").val();
  const nameCheck = /^[a-zA-Z ]+$/.test(name);
  return nameCheck;
};
//validation of name
const nameVal = () => {
  if (isValidName()) {
    $('label[for="name"]').css("color", "");
    $("#name").css("border", "");
  } else {
    $('label[for="name"]').css("color", "red");
    $("#name").css("border", "2px solid red");
  }
};
$("#name").on("change", function() {
  nameVal();
});
//function for email
const isValidEmail = () => {
  const email = $("#mail").val();
  const emailCheck = /^.+@\w+\.com$/i.test(email);
  return emailCheck;
};
//validation of email
const emailVal = () => {
  if (isValidEmail()) {
    $('label[for="mail"]').css("color", "");
    $("#mail").css("border", "");
  } else {
    $('label[for="mail"]').css("color", "red");
    $("#mail").css("border", "2px solid red");
  }
};
$("#mail").on("change", function() {
  emailVal();
});

//check mark for the activities
const checked = () => {
  const activityCount = $(".activities input:checkbox:checked").length;
  const activtyLegend = $(".activities legend");
  if (activityCount >= 1) {
    activtyLegend.css("color", "");
    return true;
  } else {
    activtyLegend.css("color", "red");
    return false;
  }
};

$(".activities").on("change", function() {
  checked();
});

//validating the credit card number, only 13-16 numbers allowed
const isValidCC = () => {
  const ccNumInput = $("#cc-num").val();
  const ccNumCheck = /^[0-9]{13,16}$/.test(ccNumInput);
  return ccNumCheck;
};

//fundtion for zip code, only 5 and/or4 numbers allowed
const isValidZip = () => {
  const zipCode = $("#zip").val();
  const zipCodeCheck = /^\d{5}(?:[-\s]\d{4})?$/.test(zipCode);
  return zipCodeCheck;
};
//function for CVV number, only 3 numbers allowed
const isValidCVV = () => {
  const cvv = $("#cvv").val();
  const cvvCheck = /^[0-9]{3,4}$/.test(cvv);
  return cvvCheck;
};

//validation of the credit card number, ccv number and zip code
const cardVal = () => {
  if (isValidCC()) {
    $('label[for="cc-num"]').css("color", "");
    $("#cc-num").css("border", "");
  } else {
    $('label[for="cc-num"]').css("color", "red");
    $("#cc-num").css("border", "2px solid red");
  }
  if (isValidZip()) {
    $('label[for="zip"]').css("color", "");
    $("#zip").css("border", "");
  } else {
    $('label[for="zip"]').css("color", "red");
    $("#zip").css("border", "2px solid red");
  }
  if (isValidCVV()) {
    $('label[for="cvv"]').css("color", "");
    $("#cvv").css("border", "");
  } else {
    $('label[for="cvv"]').css("color", "red");
    $("#cvv").css("border", "2px solid red");
  }
};

//event listener for credit card number, zip code and cvv number
$("#cc-num, #zip, #cvv").on("change", function() {
  cardVal();
});

//function for payment selected
const isValidPayment = () => {
  const paymentVal = $("#payment :selected").text();
  if (paymentVal === "PayPal" || paymentVal === "Bitcoin") {
    return true;
  }
  if (paymentVal === "Credit Card") {
    if (isValidCC() && isValidZip() && isValidCVV()) {
      return true;
    }
    return false;
  }
};
