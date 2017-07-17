/**
 * DataTable implements AJAX actions with data in table
 * 
 * Options object must contain:
 * - $container - jQuery object of container table.
 * - renderRow(item) - callback which renders one item (but not attaches it) and returns it as jQuery object.
 * - loadForm($row, type) - callback which loads item edit form.
 *                          $row - jQuery object of item row to be edited. Null for new item form.
 *                          type - 'add' for new item form, 'edit' for edit form.
 *                          loadForm must return jqXHR object of form loading process.
 * - getItems() - callback which loads items for the table. Must return jQuery deferred object.
 * - addItem($form) - callback which stores new item. Must return jQuery deferred object.
 *                    $form - jQuery object of form with new item data.
 * - editItem($row, $form) - callback which stores updated item. Must return jQuery deferred object.
 *                           $row - jQuery object of table row with updated item.
 *                           $form - jQuery object of form with updated item data.
 * - deleteItem($row) - callback which deletes item. Must return jQuery deferred object.
 *                      $row - jQuery object of table row with item to be deleted.
 * @param {Object} opts Options object.
 * @constructor
 */
DataTable = function(opts) {
    this.$container = opts.$container;
    this.cbRenderRow = opts.renderRow;
    this.cbLoadForm = opts.loadForm;
    this.cbGetItems = opts.getItems;
    this.cbAddItem = opts.addItem;
    this.cbEditItem = opts.editItem;
    this.cbDeleteItem = opts.deleteItem;
    
    this.init();
};
$.extend(DataTable.prototype, {
    /**
     * Sets up the table, attaches event handlers
     */
    init: function() {
        var self = this;
        self.$rows = self.$container.find('tbody');
        self.$btnAdd = self.$container.find('[name="add"]');
        
        //show add form
        self.$btnAdd.click(function() {
            self.showForm(null, 'add');
            return false;
        });
        //show edit form
        self.$container.on('click', '[name="edit"]', function() {
            self.showForm($(this).closest('.data-row'), 'edit');
            return false;
        });
        //delete item
        self.$container.on('click', '[name="delete"]', function() {
            self.deleteItem($(this).closest('.data-row'));
            return false;
        });
    },
    /**
     * Get and render all data items
     */
    fill: function() {
        var self = this;
        self.cbGetItems().done(function(items) {
            for (var i=0; i<items.length; i++) {
                self.$container.append(self.cbRenderRow(items[i]));
            }
        });
    },
    /**
     * Load and show add/edit form
     * 
     * @param {jQuery} $row Item row to be edited. Null for new item form.
     * @param {string} type 'add' for new item form, 'edit' for edit form.
     */
    showForm: function($row, type) {
        var self = this;
        
        //load form with AJAX callback and then render it
        self.cbLoadForm($row, type).done(function(html) {
            self.renderForm($row, type, html);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        });
    },
    /**
     * Render add/edit form
     * 
     * @param {jQuery} $row Item row to be edited. Null for new item form.
     * @param {string} type 'add' for new item form, 'edit' for edit form.
     * @param {html} html Form html to be rendered.
     */
    renderForm: function($row, type, html) {
        var self = this;
        
        var $formRow = $('<tr class="form-row"><td colspan="3"></td></tr>');
        
        if (type==='add') {
            self.$btnAdd.hide();
            self.$rows.append($formRow);
        } else {
            $row.before($formRow);
            $row.detach(); //don't remove row completely - it may be restored on form cancel
        }
        
        $formRow.find('> td').html(html);
        
        $formRow.on('submit', 'form', function() {
            self.postItem(type, $(this), $row);
            return false;
        });

        $formRow.on('click', '[name="cancel-form"]', function() {
            self.cancelForm(type, $formRow, $row);
        });
    },
    /**
     * Cancel form and show old item data
     * 
     * @param {string} type 'add' for new item form, 'edit' for edit form.
     * @param {jQuery} $formRow Table row with the form.
     * @param {jQuery} $oldRow Item row which was edited. Null for new item form.
     */
    cancelForm: function(type, $formRow, $oldRow) {
        if (type==='add') {
            this.$btnAdd.show();
            $formRow.remove();
        } else {
            //restore previously detached row
            $formRow.replaceWith($oldRow);
        }
    },
    
    /**
     * Add or update item
     * 
     * @param {string} type 'add' for new item, 'edit' for item edit.
     * @param {jQuery} $form Filled item form.
     * @param {jQuery} $oldRow Item row which was edited. Null for new item form.
     * @returns {jQuery.Deferred}
     */
    postItem: function(type, $form, $oldRow) {
        var self = this;
        var $formRow = $form.closest('.form-row');
        var updating = (type==='add')? self.cbAddItem($form) : self.cbEditItem($oldRow, $form);
        updating.done(function(item) {
            $formRow.replaceWith(self.cbRenderRow(item));
            if (type==='add') {
                self.$btnAdd.show();
            } else {
                $oldRow.remove(); //remove old item row finally after form closing
            }
        }).fail(function(error) {
            alert(error);
        });
        return updating;
    },
    /**
     * Delete item
     * 
     * @param {jQuery} $row Item row to be deleted.
     * @returns {jQuery.Deferred}
     */
    deleteItem: function($row) {
        return this.cbDeleteItem($row).done(function() {
            $row.remove();
        }).fail(function(error) {
            alert(error);
        });
    }
});
