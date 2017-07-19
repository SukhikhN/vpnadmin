<script id="tmplCompanyRow" type="text/template">
<tr class="data-row">
    <td><%= name %></td>
    <td><%= bToTb(quota) %> TB</td>
    <td class="controls">
        <button class="btn btn-secondary" name="edit">Edit</button>
        <button class="btn btn-danger" name="delete">Delete</button>
        <div class="loader"></div>
    </td>
</tr>
</script>

<script id="tmplUserRow" type="text/template">
    <tr class="data-row">
        <td><%= name %></td>
        <td><%= email %></td>
        <td><%= company.name %></td>
        <td class="controls">
            <button class="btn btn-secondary" name="edit">Edit</button>
            <button class="btn btn-danger" name="delete">Delete</button>
            <div class="loader"></div>
        </td>
    </tr>
</script>

<script id="tmplAbuserRow" type="text/template">
    <tr>
        <td><%= name %></td>
        <td><%= bToTb(used, 2) %> TB</td>
        <td><%= bToTb(quota) %> TB</td>
    </tr>
</script>
