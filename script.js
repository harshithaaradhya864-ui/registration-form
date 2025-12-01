$(function () {
  const $form = $('#regForm');

  // RESET BUTTON
  $('#resetBtn').on('click', function () {
    $form[0].reset();
    $form.find('.error').remove();
    $form.find('.invalid').removeClass('invalid');
  });

  // Show inline small error
  function showInlineError($el, text) {
    $el.siblings('.error').remove();
    $('<div class="error"></div>').text(text).insertAfter($el);
  }

  function clearErrors() {
    $form.find('.error').remove();
    $form.find('.invalid').removeClass('invalid');
  }

  function validate() {
    clearErrors();

    // Values
    const first = $('#firstName').val().trim();
    const last = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const dob = $('#dob').val();
    const age = $('#age').val().trim();
    const country = $('#country').val();
    const address = $('#address').val().trim();

    // First name
    if (!first) {
      $('#firstName').addClass('invalid').focus();
      showInlineError($('#firstName'), 'First name is required.');
      return false;
    }

    // Last name
    if (!last) {
      $('#lastName').addClass('invalid').focus();
      showInlineError($('#lastName'), 'Last name is required.');
      return false;
    }

    // Email
    if (!email) {
      $('#email').addClass('invalid').focus();
      showInlineError($('#email'), 'Email is required.');
      return false;
    }
    if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
      $('#email').addClass('invalid').focus();
      showInlineError($('#email'), 'Email must end with @gmail.com');
      return false;
    }

    // Phone = 10 digits
    if (!/^\d{10}$/.test(phone)) {
      $('#phone').addClass('invalid').focus();
      showInlineError($('#phone'), 'Phone must be 10 digits.');
      return false;
    }

    // DOB required + before 2025
    if (!dob) {
      $('#dob').addClass('invalid').focus();
      showInlineError($('#dob'), 'Date of birth is required.');
      return false;
    }
    if (new Date(dob) > new Date('2025-12-31')) {
      $('#dob').addClass('invalid').focus();
      showInlineError($('#dob'), 'DOB cannot be after 2025.');
      return false;
    }

    // Age
    if (!age || age <= 0) {
      $('#age').addClass('invalid').focus();
      showInlineError($('#age'), 'Age is required.');
      return false;
    }

    // Country
    if (!country) {
      $('#country').addClass('invalid').focus();
      showInlineError($('#country'), 'Please select a country.');
      return false;
    }

    // Gender
    if ($('input[name="gender"]:checked').length === 0) {
      showInlineError($('.fieldset').eq(0), 'Select a gender.');
      return false;
    }

    // Skills
    if ($('input[name="skills[]"]:checked').length === 0) {
      showInlineError($('.fieldset').eq(1), 'Select at least one skill.');
      return false;
    }

    // Address
    if (!address) {
      $('#address').addClass('invalid').focus();
      showInlineError($('#address'), 'Address is required.');
      return false;
    }

    return true;
  }

  // SUBMIT
  $form.on('submit', function (e) {
    e.preventDefault();
    if (validate()) {
      clearErrors();
      $form.off('submit');
      $form.submit(); // now submit to PHP
    }
  });
});
