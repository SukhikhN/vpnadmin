Api = (function() {
    function request(type, path, data) {
        var sending = new $.Deferred();
        
        $.ajax({
            type: type,
            url: Vars.apiUrl + path,
            data: data,
            contentType: 'application/json; charset=UTF-8'
        }).done(function(data, textStatus, jqXHR){
            sending.resolveWith(window, [data]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            var error = errorThrown;
            var data = $.parseJSON(jqXHR.responseText);
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
        }
    }
})();