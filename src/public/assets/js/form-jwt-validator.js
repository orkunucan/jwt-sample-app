(function() {
    'use strict'

    window.addEventListener('load', () => {
        const forms = document.getElementsByName('form-jwt-validator');
        Array.prototype.filter.call(forms, (form) => {
            new URLSearchParams(new FormData(form)).toString()
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                event.stopPropagation();

                form.classList.add('was-validated');

                if (form.checkValidity() === true) {
                    $.ajax({
                        type: 'POST',
                        url: 'api/v1/tokens/validate-jwt',
                        data: $(form).serialize(),
                        success: (r) => {
                            document.getElementById('token-response').innerHTML = JSON.stringify(r, undefined, 4); 
                            console.log(r);
                        },
                        error: (err) => {
                            if(err.status && err.status === 400) {
                                document.getElementById('token-response').innerHTML = JSON.stringify(err.responseJSON, undefined, 4);
                                console.log(err);
                                return;
                            }
                            throw err;
                        },
                      });
                }
            }, false);
        });
    });
}());