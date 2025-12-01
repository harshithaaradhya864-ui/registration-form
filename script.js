$(function () {

  const $form = $('#regForm');
  const $result = $('#resultArea');

  // Reset button clears everything
  $('#resetBtn').on('click', function () {
      $form[0].reset();
      $result.addClass('hidden').empty();
      $form.find('.error').remove();
      $form.find('.invalid').removeClass('invalid');
  });

  // Helper: show small error below the input
  function showError(selector, message) {
      $(selector).addClass('invalid');
      $(selector).next('.error').remove();
      $('<div class="error"></div>').text(message).insertAfter($(selector));
  }

  // Validation function
  function validateForm() {

      let valid = true;
      $form.find('.error').remove();
      $form.find('.invalid').removeClass('invalid');

      // FIRST NAME
      const fn = $('#firstName').val().trim();
      if (fn === "") {
          showError('#firstName', "First name is required");
          valid = false;
      }

      // LAST NAME
      const ln = $('#lastName').val().trim();
      if (ln === "") {
          showError('#lastName', "Last name is required");
          valid = false;
      }

      // EMAIL
      const email = $('#email').val().trim();
      if (!email.endsWith('@gmail.com')) {
          showError('#email', "Email must end with @gmail.com");
          valid = false;
      }

      // PHONE
      const phone = $('#phone').val().trim();
      if (!/^\d{10}$/.test(phone)) {
          showError('#phone', "Phone number must be 10 digits");
          valid = false;
      }

      // DOB
      const dob = $('#dob').val();
      if (dob) {
          const selectedYear = new Date(dob).getFullYear();
          if (selectedYear > 2025) {
              showError('#dob', "DOB cannot be above 2025");
              valid = false;
          }
      } else {
          showError('#dob', "Please select date of birth");
          valid = false;
      }

      // COUNTRY
      if ($('#country').val() === "") {
          showError('#country', "Please select a country");
          valid = false;
      }

      // GENDER (radio)
      if (!$("input[name='gender']:checked").val()) {
          showError("fieldset[aria-label='Gender']", "Please select gender");
          valid = false;
      }

      // SKILLS (checkbox)
      if ($("input[name='skills[]']:checked").length === 0) {
          showError("fieldset[aria-label='Skills']", "Select at least one skill");
          valid = false;
      }

      return valid;
  }

  // Form submit
  $form.on('submit', function (e) {
      e.preventDefault();

      if (validateForm()) {
          this.submit(); // real POST submission
      }
  });

  // Add red border for invalid inputs
  $('<style>')
      .html('.invalid{border-color:#b91c1c !important; box-shadow:0 0 0 2px rgba(185,28,28,0.2);}')
      .appendTo('head');

});
