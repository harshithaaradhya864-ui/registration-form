$(function () {
  const $form = $('#regForm');

  // reset
  $('#resetBtn').on('click', function () {
    $form[0].reset();
    $form.find('.error').remove();
    $form.find('.invalid').removeClass('invalid');
  });

  function showInlineError($el, text) {
    // remove previous
    const $existing = $el.siblings('.error');
    $existing.remove();
    $('<div class="error" role="alert"></div>').text(text).insertAfter($el);
  }

  function clearErrors() {
    $form.find('.error').remove();
    $form.find('.invalid').removeClass('invalid');
  }

  function validate() {
    clearErrors();

    // values
    const fullName = $('#fullName').val().trim();
    const dob = $('#dob').val();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().replace(/\D/g,''); // digits only
    const course = $('#course').val();
    const address = $('#address').val().trim();

    // first checks
    if (!fullName) {
      $('#fullName').addClass('invalid').focus();
      showInlineError($('#fullName'), 'Full name is required.');
      return false;
    }

    if (!email) {
      $('#email').addClass('invalid').focus();
      showInlineError($('#email'), 'Email is required.');
      return false;
    }

    // email must end with @gmail.com (case-insensitive)
    if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
      $('#email').addClass('invalid').focus();
      showInlineError($('#email'), 'Email must end with @gmail.com');
      return false;
    }

    // phone exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      $('#phone').addClass('invalid').focus();
      showInlineError($('#phone'), 'Phone number must be exactly 10 digits.');
      return false;
    }

    // dob not later than 2025-12-31
    if (dob) {
      const limit = new Date('2025-12-31');
      const given = new Date(dob);
      if (given > limit) {
        $('#dob').addClass('invalid').focus();
        showInlineError($('#dob'), 'Date of birth cannot be later than 2025.');
        return false;
      }
    } else {
      $('#dob').addClass('invalid').focus();
      showInlineError($('#dob'), 'Date of birth is required.');
      return false;
    }

    // course required
    if (!course) {
      $('#course').addClass('invalid').focus();
      showInlineError($('#course'), 'Please select a course.');
      return false;
    }

    // at least one skill
    if ($('input[name="skills[]"]:checked').length === 0) {
      // show error under skills fieldset
      showInlineError($('#skillsField'), 'Select at least one skill.');
      $('#skillsField')[0].scrollIntoView({behavior:'smooth', block:'center'});
      return false;
    }

    // gender required
    if ($('input[name="gender"]:checked').length === 0) {
      showInlineError($('#genderField'), 'Please choose a gender.');
      $('#genderField')[0].scrollIntoView({behavior:'smooth', block:'center'});
      return false;
    }

    // all good
    return true;
  }

  // intercept submit, validate, then submit if ok
  $form.on('submit', function(e) {
    e.preventDefault();
    if (validate()) {
      // remove inline messages then submit to PHP normally
      clearErrors();
      // final submit
      $form.off('submit'); // avoid double intercept
      $form.submit();
    }
  });
});
