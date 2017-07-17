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
            var error = errorThrown;
            var data;
            try {
                data = $.parseJSON(jqXHR.responseText);
            } catch(e) {}
            if (data && data.message) {
                error = data.message;
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
        }
    }
})();