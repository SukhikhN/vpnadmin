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
    
    /**
     * Generate random traffic data for specified time interval
     * 
     * @param \DateTime $start
     * @param \DateTime $end
     */
    public static function generate(\DateTime $start, \DateTime $end) {
        //TODO: move these constants to more appropriate place
        //min and max number of transfers for user for month (31 day) to be generated
        $minTransfers = 10;
        $maxTransfers = 100;
        //min and max size of one transfer
        $minBytes = 100;
        $maxBytes = 10*pow(10, 12); //10 TB

        $faker = \Faker\Factory::create();
        $users = User::find()->all();
        
        //loop through time interval month-by-month
        $currStart = $start;
        $currEnd = clone $currStart; $currEnd->modify('+1 month');
        while ($currStart<$end) {
            //adjust transfers count to interval length
            $intervalDays = $currStart->diff($currEnd)->days;
            if ($intervalDays<1)
                $intervalDays = 1;
            
            $min = ceil($minTransfers*$intervalDays/31);
            $max = ceil($maxTransfers*$intervalDays/31);
            
            //loop through each user in this month
            foreach ($users as $user) {
                //generate random number of transfers
                $transfers = $faker->numberBetween($min, $max);
                for ($i=1; $i<=$transfers; $i++) {
                    $transfer = new static();
                    $transfer->user_id = $user->id;
                    //TODO: move formatting to attribute behavior
                    $transfer->date = $faker->dateTimeBetween($currStart, $currEnd)->format('Y-m-d H:i:s');
                    $transfer->bytes = $faker->numberBetween($minBytes, $maxBytes);
                    $transfer->save();
                }
            }
            
            //move to next month
            $currStart->modify('+1 month');
            $currEnd->modify('+1 month');
            if ($currEnd>$end)
                $currEnd = $end;
        }
    }
    
    /**
     * Construct query for companies that exceeded their traffic quota
     * 
     * @param int $year
     * @param int $month
     * @return \yii\db\Query
     */
    public static function abusers($year, $month) {
        $abusersQuery = (new \yii\db\Query())->select([
            'company.id',
            'company.name',
            'company.quota',
            'SUM(bytes) as used',
        ])
            ->from(static::tableName())
            ->leftJoin(User::tableName(), 'traffic.user_id = user.id')
            ->leftJoin(Company::tableName(), 'user.company_id = company.id')
            ->where('YEAR(date)=:year')
            ->andWhere('MONTH(date)=:month')
            ->groupBy(['company.id'])
            ->having('used > company.quota')
            ->orderBy(['used'=>SORT_DESC])
            ->addParams([
                ':year' => intval($year),
                ':month' => intval($month),
            ]);

        return $abusersQuery;
    }
}
