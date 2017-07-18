<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "traffic".
 *
 * @property string $id
 * @property integer $user_id
 * @property string $date
 * @property integer $bytes
 *
 * @property User $user
 */
class Traffic extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'traffic';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'date', 'bytes'], 'required'],
            [['user_id', 'bytes'], 'integer'],
            [['date'], 'safe'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User',
            'date' => 'Date',
            'bytes' => 'Transferred',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * @inheritdoc
     * @return TrafficQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new TrafficQuery(get_called_class());
    }
}
