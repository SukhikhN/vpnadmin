$(function() {
    function doAction() {
        switch (Vars.action) {
            case 'site/companies':
                actionCompanies();
                break;
            case 'site/users':
                actionUsers();
                break;
            case 'site/abusers':
                actionAbusers();
                break;
            default:
                console.error('Unknown action');
        }
    }
    
    function actionCompanies() {
        Api.getCompanies().done(function(companies) {
            var $container = $('#companies').find('tbody');
            for (var i=0; i<companies.length; i++) {
                var company = companies[i];
                var $row = $(tmpl('tmplCompanyRow', company));
                $row.data('id', company.id);
                $container.append($row);
            }
        });
    }
    
    function actionUsers() {
        
    }
    
    function actionAbusers() {
        
    }

    $(document).on('pjax:end', function(xhr, options) {
        doAction();
    });
    
    doAction();
});
