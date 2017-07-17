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
    
    function renderCompany(company) {
        var $row = $(tmpl('tmplCompanyRow', company));
        $row.data('id', company.id);
        return $row;
    }
    
    function actionCompanies() {
        var $container = $('#companies'),
            $rows = $container.find('tbody'),
            $btnAddCompany = $container.find('[name="add-company"]');
        Api.getCompanies().done(function(companies) {
            for (var i=0; i<companies.length; i++) {
                $container.append(renderCompany(companies[i]));
            }
        });
        
        $btnAddCompany.click(function() {
            $btnAddCompany.hide();
            var $row = $('<tr class="add-company-row"><td colspan="3"></td></tr>');
            $rows.append($row);
            $row.find('> td').load(Vars.apiUrl+'ajax/form/company', function(response, status, xhr) {
                if (status==='error') {
                    alert(xhr.statusText);
                    cancelAdd($row);
                }

                $row.on('submit', 'form', function() {
                    var $form = $(this);
                    Api.addCompany($form).done(function(company) {
                        $row.replaceWith(renderCompany(company));
                        $btnAddCompany.show();
                    }).fail(function(error) {
                        alert(error);
                    });
                    return false;
                });
                
                $row.on('click', '[name="cancel-form"]', function() {
                    cancelAdd($row);
                });
            });
        });
        
        $container.on('click', '[name="edit-company"]', function() {
            var $row = $(this).closest('.company-row'),
                $editRow = $('<tr class="add-company-row"><td colspan="3"></td></tr>');
            $editRow.insertBefore($row);
            $row.detach();
            $editRow.find('> td').load(Vars.apiUrl+'ajax/form/company/'+$row.data('id'), function(response, status, xhr) {
                if (status==='error') {
                    alert(xhr.statusText);
                    cancelEdit($editRow, $row);
                }
                
                $editRow.on('submit', 'form', function() {
                    var $form = $(this);
                    Api.editCompany($row.data('id'), $form).done(function(company) {
                        $editRow.replaceWith(renderCompany(company));
                        $row.remove();
                    }).fail(function(error) {
                        alert(error);
                    });
                    return false;
                });
                
                $editRow.on('click', '[name="cancel-form"]', function() {
                    cancelEdit($editRow, $row);
                });
            });
        });
        
        $container.on('click', '[name="delete-company"]', function() {
            var $row = $(this).closest('.company-row');
            Api.deleteCompany($row.data('id')).done(function() {
                $row.remove();
            }).fail(function(error) {
                alert(error);
            });
            return false;
        });
        
        function cancelEdit($editRow, $row) {
            $editRow.replaceWith($row);
        }
        
        function cancelAdd($row) {
            $btnAddCompany.show();
            $row.remove();
        }
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
