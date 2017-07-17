Api = (function() {
    function request(type, path, data) {
        var sending = new $.Deferred();
        
        if (typeof data === 'object' && data.nodeName === 'FORM') {
            data = $(data);
        }
        if (data instanceof jQuery && data.is('form')) {
            data = JSON.stringify(data.serializeFormJSON());
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