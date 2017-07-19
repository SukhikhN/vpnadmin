<?php

/* @var $this yii\web\View */

$this->title = 'Users';
?>
<div id="users" class="table-container">
    <div class="loader"></div>
    <table id="users" class="table table-hover">
        <thead><tr>
            <th class="name">Name</th>
            <th class="email">Email</th>
            <th class="company">Company</th>
            <th class="conrols"></th>
        </tr></thead>
        <tbody>
        </tbody>
        <tfoot><tr>
            <td colspan="3"><button class="btn btn-primary" name="add">Add</button></td>
        </tr></tfoot>
    </table>
</div>
