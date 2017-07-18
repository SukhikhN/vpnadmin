<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[Traffic]].
 *
 * @see Traffic
 */
class TrafficQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return Traffic[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return Traffic|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
