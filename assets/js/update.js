function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save      = document.createElement('a');
        save.href     = fileURL;
        save.target   = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view'      : window,
            'bubbles'   : true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}

jQuery(document).ready(function ($) {

    var loginModal   = jQuery('#loginModal'),
        signupModal  = jQuery('#signupModal'),
        forgotModal  = jQuery('#forgotModal'),
        newpassModal = jQuery('#newpasswordModal'),
        body         = jQuery(document);

    function loading(stt) {
        switch (stt) {
            case 'on':
                body.addClass('loading');
                break;
            default: // off
                body.removeClass('loading');
        }
    }

    //Init
    // loginModal.modal('show');

    jQuery('.targetForgotModal').on('click', function (e) {
        e.preventDefault();
        loginModal.modal('hide');
        signupModal.modal('hide');
        forgotModal.modal('show');
    });

    jQuery('.requireLogin').on('click', function (e) {
        e.preventDefault();
        loginModal.modal('show');
    });

    // Forgot modal
    //forgotModal.modal('show');
    if(newpassModal.length > 0){
        newpassModal.modal('show');
        loginModal.modal('hide');
    }
    body.on('submit', '#forgotModalForm', function (e) {
        loading('on');
        var form   = jQuery(this),
            notify = form.find('.help-block');
        jQuery.ajax({
            type      : 'POST',
            dataType  : 'json',
            url       : ajax_login_object.ajaxurl,
            data      : form.serialize(),
            beforeSend: function () {
                // loginStatus.hide();
            },
            success   : function (res) {
                notify.html('');
                if (res.success) {
                    notify.removeClass('text-danger');
                    notify.addClass('text-success');
                    form.find('[type=submit]').prop('disabled', true);
                    notify.html(res.data.message);
                } else {
                    notify.addClass('text-danger');
                    notify.removeClass('text-success');
                    for (i = 0; i < res.data.errors.length; i++) {
                        notify.append('<li>' + res.data.errors[i] + '</li>');
                    }
                }
            },
            complete  : function () {
                loading('off');
            }
        });
        e.preventDefault();
    });
    body.on('submit', '#newpasswordModalForm', function (e) {
        loading('on');
        var form = jQuery(this),
            notify = form.find('.help-block');
        jQuery.ajax({
            type      : 'POST',
            dataType  : 'json',
            url       : ajax_login_object.ajaxurl,
            data      : form.serialize(),
            beforeSend: function () {
                // loginStatus.hide();
            },
            success   : function (res) {
                notify.html('');
                if (res.success) {
                    notify.removeClass('text-danger');
                    notify.addClass('text-success');
                    notify.html(res.data.message);
                    setTimeout(function(){
                        newpassModal.modal('hide');
                        loginModal.modal('show');
                    },2000);
                } else {
                    notify.addClass('text-danger');
                    notify.removeClass('text-success');
                    for (i = 0; i < res.data.errors.length; i++) {
                        notify.append('<li>' + res.data.errors[i] + '</li>');
                    }
                }
            },
            complete  : function () {
                loading('off');
            }
        });
        e.preventDefault();
    });

    // Event
    body.on('click', '#targetSignupModal', function (e) {
        e.preventDefault();
        loginModal.modal('hide');
        signupModal.modal('show');
    }).on('click', '#targetLoginModal', function (e) {
        e.preventDefault();
        signupModal.modal('hide');
        loginModal.modal('show');
    }).on('submit', '#loginModalForm', function (e) {
        // Perform AJAX login on form submit
        loading('on');
        var form        = jQuery(this),
            loginStatus = form.parent().find('.loginStatus');
        jQuery.ajax({
            type      : 'POST',
            dataType  : 'json',
            url       : ajax_login_object.ajaxurl,
            data      : {
                'action'  : 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': form.find('[name=email]').first().val(),
                'password': form.find('[name=password]').first().val(),
                'security': form.find('[name=security]').first().val()
            },
            beforeSend: function () {
                loginStatus.hide();
            },
            success   : function (data) {
                if (data.loggedin == true) {
                    location.reload();
                } else {
                    loginStatus.show().text(data.message);
                }
            },
            complete  : function () {
                loading('off');
            }
        });
        e.preventDefault();
    }).on('submit', '#signupModalForm, #signupboxForm', function (e) {
        loading('on');
        var form         = jQuery(this),
            signupStatus = form.parent().find('.signupStatus');
        jQuery.ajax({
            type      : 'POST',
            dataType  : 'json',
            url       : ajax_login_object.ajaxurl,
            data      : {
                'action'  : 'ajaxregister', //calls wp_ajax_nopriv_ajaxlogin
                'username': form.find('[name=email]').first().val(),
                'password': form.find('[name=password]').first().val(),
                'security': form.find('[name=security]').first().val()
            },
            beforeSend: function () {
                signupStatus.hide();
            },
            success   : function (data) {
                if (data.loggedin == true) {
                    location.reload();
                } else {
                    signupStatus.show().text(data.message);
                }
            },
            complete  : function () {
                loading('off');
            }
        });
        e.preventDefault();
    });
});