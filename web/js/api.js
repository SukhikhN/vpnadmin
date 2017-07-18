Api = (function() {
    /**
     * Make request to the VPN Admin API
     * 
     * @param {string} type 'GET', 'POST' etc.
     * @param {string} path Api action.
     * @param {string|Object|jQuery=undefined} data JSON string, or data object or form with data to be sent.
     * @returns {jQuery.Deferred}
     */
    function request(type, path, data) {
        var sending = new $.Deferred();
        
        //convert form data to JSON if data is DOM or jQuery form object  
        if (typeof data === 'object' && data.nodeName === 'FORM') {
            data = $(data);
        }
        if (data instanceof jQuery && data.is('form')) {
            data = JSON.stringify(data.serializeFormJSON());
        } else if (typeof data === 'object') {
            data = JSON.stringify(data)
        }
        
        $.ajax({
            type: type,
            url: Vars.apiUrl + path,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8'
        }).done(function(data, textStatus, jqXHR){
            sending.resolveWith(window, [data]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            //by default take HTTP message as error
            var error = errorThrown;
            
            var data;
            try {
                data = $.parseJSON(jqXHR.responseText);
            } catch(e) {}
            //try to get error message directly from response data
            if (data && data.message) {
                error = data.message;
            } else if ($.isArray(data)) {
                //try to parse model validation messages and transform them to Yii Active Form format
                var errors = {};
                for (var i=0; i<data.length; i++) {
                    var err = data[i];
                    if (err.field && err.message) {
                        errors[err.field] = errors[err.field] || [];
                        errors[err.field].push(err.message);
                    }
                }
                if (!$.isEmptyObject(errors))
                    sending.rejectWith(window, [errors]);
            }
            
            sending.rejectWith(window, [error]);
        });
        
        return sending.promise();
    }
    
    //all API functions returns jQuery.Deferred
    return {
        getCompanies: function() {
            return request('GET', 'companies');
        },
        addCompany: function(companyData) {
            return request('POST', 'companies', companyData);
        },
        editCompany: function(id, companyData) {
            return request('PUT', 'companies/'+id, companyData);
        },
        deleteCompany: function(id) {
            return request('DELETE', 'companies/'+id);
        },

        getUsers: function() {
            return request('GET', 'users');
        },
        addUser: function(userData) {
            return request('POST', 'users', userData);
        },
        editUser: function(id, userData) {
            return request('PUT', 'users/'+id, userData);
        },
        deleteUser: function(id) {
            return request('DELETE', 'users/'+id);
        }
    }
})();
