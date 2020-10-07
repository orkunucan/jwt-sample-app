(function() {
    'use strict'

    window.addEventListener('load', () => {
        const forms = document.getElementsByName('form-jwt-generator');
        Array.prototype.filter.call(forms, (form) => {
            new URLSearchParams(new FormData(form)).toString()
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                event.stopPropagation();

                form.classList.add('was-validated');

                if (form.checkValidity() === true) {
                    $.ajax({
                        type: 'POST',
                        url: 'api/v1/tokens/generate-jwt',
                        data: $(form).serialize(),
                        success: (r) => {
                            $('#token').val(r.token);
                            $('#tokenExpiresIn').val(r.expiresIn);
                            console.log(r);
                        },
                        error: (err) => {
                            throw err;
                        },
                      });
                }
            }, false);
        });
    });
}());