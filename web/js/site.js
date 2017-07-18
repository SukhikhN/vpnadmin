$(function() {
    /**
     * Execute controller function based on current action
     */
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

    /**
     * Controller for companies list
     */
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
                var formData = $form.serializeFormJSON();
                var quota = Number(formData.quota);
                if (!isNaN(quota))
                    formData.quota = tbToB(quota);
                return Api.addCompany(formData);
            },
            editItem: function ($row, $form) {
                var formData = $form.serializeFormJSON();
                //convert quota to bytes
                var quota = Number(formData.quota);
                if (!isNaN(quota))
                    formData.quota = tbToB(quota);
                return Api.editCompany($row.data('id'), formData);
            },
            deleteItem: function ($row) {
                return Api.deleteCompany($row.data('id'));
            }
        });
        
        companiesTable.fill();
    }

    /**
     * Controller for users list
     */
    function actionUsers() {
        var usersTable = new DataTable({
            $container: $('#users'),
            renderRow: function (user) {
                var $row = $(tmpl('tmplUserRow', user));
                $row.data('id', user.id);
                return $row;
            },
            loadForm: function ($row, type) {
                if (type === 'add')
                    return $.get(Vars.apiUrl + 'ajax/form/user');
                else
                    return $.get(Vars.apiUrl + 'ajax/form/user/' + $row.data('id'));
            },
            getItems: $.proxy(Api.getUsers, Api),
            addItem: function ($form) {
                return Api.addUser($form);
            },
            editItem: function ($row, $form) {
                return Api.editUser($row.data('id'), $form);
            },
            deleteItem: function ($row) {
                return Api.deleteUser($row.data('id'));
            }
        });

        usersTable.fill();
    }

    /**
     * Controller for abusers page
     */
    function actionAbusers() {
        var $container = $('#abusers-container'),
            $abusersRows = $container.find('#abusers tbody');
        
        //generate traffic data
        $container.on('click', '[name="generate"]', function() {
            Api.generateTrafficData().done(function() {
                //reload page because months list may be changed
                $.pjax.reload('#pjax');
                alert('Traffic data generated successfully');
            }).fail(function(error) {
                alert(error);
            });
            
            return false;
        });
        
        //show abusers report
        $container.on('click', '[name="report"]', function() {
            var date = $container.find('[name="date"]').val();
            
            $abusersRows.empty();
            
            if (date===null)
                return false;
            
            Api.getAbusers(date).done(function(abusers) {
                for (var i=0; i<abusers.length; i++) {
                    var $row = $(tmpl('tmplAbuserRow', abusers[i]));
                    $abusersRows.append($row);
                }
            }).fail(function(error) {
                alert(error);
            });
        });
    }
    
    //run actions on pjax navigation and after normal page load
    $(document).on('pjax:end', function(xhr, options) {
        doAction();
    });
    doAction();
});
