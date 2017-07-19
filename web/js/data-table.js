/**
 * DataTable implements AJAX actions with data in table
 * 
 * Options object must contain:
 * - $container - jQuery object of container with table.
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
        self.cols = self.$container.find('thead th').length;
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
            var $btn = $(this),
                $cell = $btn.closest('.controls');

            $cell.addClass('loading');
            $btn.prop('disabled', true);
            
            self.deleteItem($btn.closest('.data-row')).always(function() {
                $cell.removeClass('loading');
                $btn.prop('disabled', false);
            });
            return false;
        });
    },
    /**
     * Get and render all data items
     */
    fill: function() {
        var self = this;
        self.$container.addClass('loading');
        self.cbGetItems().done(function(items) {
            for (var i=0; i<items.length; i++) {
                self.$rows.append(self.cbRenderRow(items[i]));
            }
        }).always(function() {
            self.$container.removeClass('loading');
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
        
        var $formRow = $('<tr class="form-row loading"><td colspan="'+self.cols+'"><div class="loader"></div></td></tr>');
        
        if (type==='add') {
            self.$btnAdd.hide();
            self.$rows.append($formRow);
        } else {
            $row.before($formRow);
            $row.detach(); //don't remove row completely - it may be restored on form cancel
        }
        
        $formRow.on('click', '[name="cancel-form"]', function() {
            self.cancelForm(type, $formRow, $row);
        });
        $formRow.on('submit', 'form', function() {
            self.postItem(type, $(this), $row);
            return false;
        });
        
        //load form with AJAX callback and then render it
        self.cbLoadForm($row, type).done(function(html) {
            self.renderForm($formRow, type, html);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $formRow.replaceWith($row);
            self.handleError(errorThrown);
        });
    },
    /**
     * Render add/edit form
     * 
     * @param {jQuery} $formRow Table row to be filled with form.
     * @param {string} type 'add' for new item form, 'edit' for edit form.
     * @param {html} html Form html to be rendered.
     */
    renderForm: function($formRow, type, html) {
        $formRow.find('> td').html(html);
        $formRow.removeClass('loading');
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
     * Handle AJAX errors
     * 
     * @param {string|Object} errors Error message or Yii Active Form messages object.
     * @param {jQuery} $form Form which was submitted.
     */
    handleError: function(errors, $form) {
        if (typeof errors === 'string') {
            alert(errors);
        } else if (typeof errors === 'object' && $form) {
            $form.yiiActiveForm('updateMessages', errors);
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
        var $formRow = $form.closest('.form-row'),
            $loadingRow = $('<tr class="loading"><td colspan="'+self.cols+'"><div class="loader"></div></td></tr>');
        
        $formRow.before($loadingRow);
        $formRow.detach();
        
        var updating = (type==='add')? self.cbAddItem($form) : self.cbEditItem($oldRow, $form);
        updating.done(function(item) {
            $loadingRow.replaceWith(self.cbRenderRow(item));
            $formRow.remove();
            if (type==='add') {
                self.$btnAdd.show();
            } else {
                $oldRow.remove(); //remove old item row finally after form closing
            }
        }).fail(function(errors) {
            $loadingRow.replaceWith($formRow);
            self.handleError(errors, $form);
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
        var self = this;
        
        return this.cbDeleteItem($row).done(function() {
            $row.remove();
        }).fail(function(error) {
            self.handleError(error);
        });
    }
});
