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
        var companiesTable = new DataTable({
            $container: $('#companies'),
            renderRow: function (company) {
                var $row = $(tmpl('tmplCompanyRow', company));
                $row.data('id', company.id);
                return $row;
            },
            loadForm: function ($row, type) {
                if (type === 'add')
                    return $.get(Vars.apiUrl + 'ajax/form/company');
                else
                    return $.get(Vars.apiUrl + 'ajax/form/company/' + $row.data('id'));
            },
            getItems: $.proxy(Api.getCompanies, Api),
            addItem: function ($form) {
                return Api.addCompany($form);
            },
            editItem: function ($row, $form) {
                return Api.editCompany($row.data('id'), $form);
            },
            deleteItem: function ($row) {
                return Api.deleteCompany($row.data('id'));
            }
        });
        
        companiesTable.fill();
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
