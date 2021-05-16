---
layout: post
title: "LeetCode-排序"
date: 2021-05-13
description: "LeetCodes刷题汇总-排序"
tags: 算法
---

## 常见排序算法

### 快速排序

```
void quickSort(vector<int> &arr, int left, int right){
    if(right<=left){
        return;
    }
    cout<<left<<","<<right<<endl;
    int p = arr[left], l = left, r = right;
    while(l<r){
        while(l<r&&arr[r]>=p){
            r--;
        }
        arr[l] = arr[r];
        while(l<r&&arr[l]<=p){
            l++;
        }
        arr[r] = arr[l];
    }
    arr[l] = p;
    quickSort(arr, left, l-1);
    quickSort(arr, l+1, right);
}
```

### 堆排序

```
void adjust(vector<int> &arr, int root, int len){
    int curVal = arr[root], curIdx = root, maxIdx = 2*root+1;

    while(maxIdx<len){
        if(maxIdx+1<len&&arr[maxIdx]<arr[maxIdx+1]){
            maxIdx++;
        }
        if(curVal >= arr[maxIdx]){
            break;
        }else{
            swap(arr[curIdx],arr[maxIdx]);
            curIdx = maxIdx;
            maxIdx = 2*curIdx+1;
        }
    }
    // cout<<"curIdx: "<<curIdx<<", arr[curIdx]: "<<arr[curIdx]<<endl;
    // swap(arr[root], arr[curIdx]);
}

void heapSort(vector<int> &arr, int len){
    //从最后一个非叶子节点开始构建最大堆
    for(int i=len/2-1;i>=0;i--){
        adjust(arr, i, len);
    }

    for(int i = len - 1; i >= 1; i--)
    {
        swap(arr[0], arr[i]);           // 将当前最大的放置到数组末尾
        adjust(arr, 0, i);              // 将未完成排序的部分继续进行堆排序
    }
}

```
