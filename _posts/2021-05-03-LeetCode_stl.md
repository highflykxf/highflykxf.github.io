---
layout: post
title: "LeetCode-STL"
date: 2021-05-03
description: "LeetCodes刷题汇总-STL相关"
tags: 算法
---

## STL

### 数据流中的第K大元素

```
class KthLargest {
public:
    priority_queue<int, vector<int>, greater<int> > minQ;//最小堆
    int K;

    KthLargest(int k, vector<int>& nums) {
        K = k;
        for(auto& x:nums){
            add(x);
        }
    }

    int add(int val) {
        minQ.push(val);
        if(minQ.size() > K){
            minQ.pop();
        }
        return minQ.top();
    }
};
```

### 用队列实现栈

```
class MyStack {
public:
    queue<int> nums;

    MyStack(){};

    void push(int x){
        nums.push(x);
        for(int i=1;i<nums.size();i++){
            int num = nums.front();
            nums.push(num);
            nums.pop();
        }
    }
    int pop(){
        int num = nums.front();
        nums.pop();
        return num;
    }
    int top(){
        return nums.front();
    }
    bool empty(){
        return nums.empty();
    }

}
```

### 用栈实现队列

```
class MyQueue {
public:
    stack<int> st1,st2;
    MyQueue(){}

    void push(int x){
        while(!st2.empty()){
            int num = st2.top();
            st1.push(num);
            st2.pop();
        }
        st1.push(x);
    }
    int pop(){
        while(!st1.empty()){
            int num = st1.top();
            st2.push(num);
            st1.pop();
        }
        int num = st2.top();
        st2.pop();
        return num;
    }
    int peek(){
        while(!st1.empty()){
            int num = st1.top();
            st2.push(num);
            st1.pop();
        }
        return st2.top();
    }
    bool empty(){
        return st1.empty()&&st2.empty();
    }
};
```

### 前K个高频元素

```
struct cmp{
    bool operator()(const pair<int,string>& p1, const pair<int,string>& p2){
        return p1.first == p2.first ? (p1.second < p2.second) : (p1.first > p2.first);
    }
};

vector<string> topKFrequent(vector<string>& words, int k) {
    vector<string> ans;
    unordered_map<string,int> mp;
    priority_queue<pair<int,string>, vector<pair<int,string> >, cmp> pQ;
    for(auto w:words){
        mp[w]++;
    }
    for(auto p:mp){
        pQ.emplace(p.second, p.first);
        if(pQ.size() > k){
            pQ.pop();
        }
    }
    while(k--){
        ans.push_back(pQ.top().second);
        pQ.pop();
    }
    reverse(ans.begin(),ans.end());
    return ans;
}
```

### 有效的括号

```
bool isValid(string s) {
    if(s.size()&1)
        return false;

    unordered_map<char,char> mp = { {'}','{'},{')','('},{']','['} };

    stack<char> st;
    for(auto ch:s){
        if(mp.count(ch)){
            if(st.empty()||mp[ch]!=st.top()){
                return false;
            }else{
                st.pop();
            }
        }else{
            st.push(ch);
        }
    }

    return st.empty();
};
```

### 每日温度

```
vector<int> dailyTemperatures(vector<int>& temperatures) {
    int len = temperatures.size();
    stack<int> pos;
    vector<int> ans(len,0);
    for(int i=0;i<len;i++){
        while(!pos.empty()&&temperatures[i]>temperatures[pos.top()]){
            ans[pos.top()] = i-pos.top();
            pos.pop();
        }
        pos.push(i);
    }
    return ans;
}
```


### 柱状图中最大的矩形
```
int largestRectangleArea(vector<int> &heights){
    heights.push_back(0);
    stack<int> st;
    int maxArea = 0, curR = 0;
    while(curR<heights.size()){
        while(!st.empty()&&heights[st.top()] > heights[curR]){
            int curHeightIdx = st.top();
            st.pop();
            maxArea = max(maxArea, (st.empty()?curR:(curR-st.top()-1))*heights[curHeightIdx]);
        }
        st.push(curR++);
    }
    return maxArea;
}
```

### 最大矩形

```
int maximalRectangle(vector<vector<char>>& matrix) {
    if(matrix.size()==0)
        return 0;
    int R= matrix.size(), C = matrix[0].size(), maxRect=0;
    vector<int> height(C);
    for(int i=0;i<R;i++){
        for(int j=0;j<C;j++){
            if(matrix[i][j]=='1'){
                height[j]+=1;
            }else{
                height[j]=0;
            }
            maxRect = max(maxRect, largestRectangleArea(height));
        }
    }
    return maxRect;
}
```
