<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $email
 * @property string $name
 * @property integer $company_id
 *
 * @property Company $company
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }
    
    /**
     * @inheritdoc
     */
    public function formName() {
        //reset form name so form fields will have same names as model attributes
        return '';
    }
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['email', 'name', 'company_id'], 'required'],
            [['company_id'], 'integer'],
            [['email'], 'string', 'max' => 255],
            [['name'], 'string', 'max' => 500],
            [['company_id'], 'exist', 'skipOnError' => true, 'targetClass' => Company::className(), 'targetAttribute' => ['company_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'email' => 'EMail',
            'name' => 'Name',
            'company_id' => 'Company',
            'company' => 'Company',
        ];
    }
    
    /**
     * @inheritdoc
     */
    public function fields() {
        return [
            'id',
            'name',
            'email',
            'company', //expanded company field in AJAX responses
        ];
    }
    
    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCompany()
    {
        return $this->hasOne(Company::className(), ['id' => 'company_id']);
    }

    /**
     * @inheritdoc
     * @return UserQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UserQuery(get_called_class());
    }
}
