---
layout: post
title: "基于Shell写定时分析任务脚本"
date: 2021-01-20
description: "Shell学习"
tags: 技术
---

<p>&emsp;&emsp;最近工作中经常要做一些实验分析的事情，每天早上坐在工位上后第一件事就是先把脚本启动起来跑数据，然后基于跑好的数据在jupyter里面分析。这种方式低效、重复性工作高，还是得写成定时任务来减少一些不必要的时间投入，也顺便把shell的一些常见使用方式熟悉一下</p>

### 输入参数
<p>&emsp;&emsp;定时跑数据首先就是要指定号跑数据的时间周期，以及一些必要的参数。以要处理的工作为例，需要输入的参数包括三个: 操作人[用于建立隶属于个人的临时表]、实验开始日期和最近一天的日期。</p>

```
if [ $# -eq 3 ];then
    operator=$1
    start_date=$2
    end_date=$3
else
    operator="zhangsan"
    end_date=`date -d "-1 day" "+%Y-%m-%d"`
    start_date="2021-01-01"
fi
 
start_date_str=`date -d "$start_date" +"%Y%m%d"`
end_date_str=`date -d "$end_date" +"%Y%m%d"`
date_month_before=`date -d "$end_date 29 day ago" +"%Y-%m-%d"`
date_month_before_str=`date -d "$end_date 29 day ago" +"%Y%m%d"`

```

这里面涉及到了if-else-fi以及日期的使用，具体用法可以参考以下练习的例子：

### dict的声明和使用

```
declare -A package_name_id_dict
package_name_id_dict=(["trial_member_addr_enterprise_0928"]=1 ["trial_member_addr_enterprise_1025"]=2 ["trial_member_addr_keywords_0928"]=3 ["level_a_credit_score_1009"]=4 ["high_value_estate_user_1027"]=5 ["level_a_credit_pred_1027"]=6 ["trial_member_addr_enterprise_1031"]=7 ["level_a_credit_score"]=8 ["level_a_credit_score_sec"]=9 ["trial_member_addr_enterprise"]=10 ["level_a_credit_pred_pred_ctr"]=11 ["brand_acty_sbsy_vip_pkg_brd_cloth_age"]=12 ["brand_acty_sbsy_vip_pkg_moncard"]=13 ["brand_acty_sbsy_vip_pkg_credit_pred_cvr"]=14 ["brand_acty_sbsy_vip_pkg_credit_pred_ctr_age40"]=15 ["brand_acty_sbsy_vip_pkg_rfm_high_m"]=16)
package_name="trial_member_addr_enterprise"
package_name_id=${package_name_id_dict[$package_name]}
echo $((${package_name_id_dict[$package_name]}-1))
```

### 数组
```
arr=("Zhang San" "Zhao Si" "Wang Wu" "Li Liu")
 
len=${#arr}
printf "arr length: %-4d\n" len
 
id_max1=$(($len-1))
id_max2=$[$len-1]
id_max=`expr $len - 1`
printf "%d %d %d\n" id_max1 id_max2 id_max
 
idx_arr=(1 3 5)

<<COMMENT
#( )来表示数组，数组元素之间用空格来分隔
#idx_arr=(1 3 5) # =两边不能有空格 使用空格分隔元素
#echo ${idx_arr[0]},数组所有元素${idx_arr[*]},数组长度: ${#idx_arr[*]}
COMMENT
 
 
#for idx in "${idx_arr[@]}"
for ((idx=0;idx<=${#idx_arr[*]};idx++));
do
    if [[ $idx -gt $id_max || $idx -ge $len ]];then
        echo "index over the array length\n"
    elif [[ $idx -le $id_max ]];then
        printf "current user: %-8s, prefix: %-2s, name length: %4d\n" ${arr[$idx]} ${arr[$idx]:0:3} ${#arr[$idx]}
        ##提取姓&名
        name=($(echo ${arr[idx]} | awk -F ' ' '{print $1,$2}'))
        echo "${name[@]}"
        printf "First Name: %s, Last Name: %s\n" ${name[1]} ${name[2]}
    else
        exit 1
    fi
done
```

### 日期的使用
```
date +"%Y-%m-%d" #获取今天日期
date -d"yesterday" +"%y-%m-%d" or date -d"1 days ago" +"%Y-%m-%d" #获取昨天日期
date -d "20210108" +"%Y-%m-%d %H:%M:%S"
```

### 上游依赖检测
<p>&emsp;&emsp;获取分析数据首先要确保上游依赖的数据表已经生成，因此在跑之前要校验一下上游表的最新分区是否有数据，如果未生成则继续等待直到依赖生成。检测方式如下，其中hive表最新分区的数据路径可以通过show create table命令在hive里面查询。</p>

```
while :
do
    hadoop fs -test -e /hdfs_path/table1/pt=${end_date}/_SUCCESS
    table1=$?
    hadoop fs -test -e /hdfs_path/table2/pt=${end_date}/_SUCCESS
    table2=$?
 
    if [[ $table1 -eq 0 && $table2 -eq 0 ]];then
        echo "tables has generated"
        break 2
    else
        echo "waiting 10min"
        sleep 600s
    fi
done
```


### 分析脚本 
<p>&emsp;&emsp;然后就可以跑生成数据的命令以及分析的脚本。</p>
```
hive -e "
drop table if exists ${operator}.analyze_data_${start_date_str}_${end_date_str};
create table ${operator}.analyze_data_${start_date_str}_${end_date_str}
select
    *
from table1 inner join table2 ...
"
if [ $? -eq 0 ]  #[$? 就是上一条命令执行的状态码]
then  
    /opt/conda/bin/python3.6 analyze_code.py ${operator}.analyze_data_${start_date_str}_${end_date_str} ${start_date} ${end_date}
fi
```

### crontab定时任务配置
<pre>
1. 编辑crontab任务: crontab -e
2. 启动crontab任务: sudo service crond start
3. 查看crontab任务: crontab -l
</pre>