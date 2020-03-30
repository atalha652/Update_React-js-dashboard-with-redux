var PNotify = window.PNotify;
export const Notifications = function() {
    var makeNotification = function(message, title, type){
        const notification = {
            title: title,
            text: message,
            icon: 'fa fa-info',
            delay: 4000,
            modules: {
                Animate: {
                animate: true,
                inClass: 'fadeIn',
                outClass: 'fadeOut',
                animateSpeed: 'normal'
                },
                Mobile: {
                swipeDismiss: true
                }
            }
        }

        if(type==="success"){
            PNotify.success(notification);
        }
        else if(type==="info"){
            PNotify.info(notification);
        }
        else if(type==="error"){
            PNotify.error(notification);
        }
    };


    return {
        notify: function(message, title="", type="success") {
            return makeNotification(message, title, type);
        }
    }
}();