<script id="tmplCompanyRow" type="text/template">
<tr class="data-row">
    <td><%= name %></td>
    <td><%= bToTb(quota) %> TB</td>
    <td>
        <button class="btn btn-secondary" name="edit">Edit</button>
        <button class="btn btn-danger" name="delete">Delete</button>
    </td>
</tr>
</script>

<script id="tmplUserRow" type="text/template">
    <tr class="data-row">
        <td><%= name %></td>
        <td><%= email %></td>
        <td><%= company.name %></td>
        <td>
            <button class="btn btn-secondary" name="edit">Edit</button>
            <button class="btn btn-danger" name="delete">Delete</button>
        </td>
    </tr>
</script>
