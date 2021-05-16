---
layout: post
title: "LeetCode-滑动窗口"
date: 2021-05-15
description: "LeetCodes刷题汇总-滑动窗口"
tags: 算法
---

## 无重复字符的最长子串

```
int lengthOfLongestSubstring(string s){
    int len = s.length();
    if(len==0){
        return 0;
    }
    unordered_map<char,int> chPos;
    int left = 0, ans = 0;
    for(int curCharIdx = 0; curCharIdx < len; curCharIdx++){
        if(chPos[s[curCharIdx]]){
            left = max(left, chPos[s[curCharIdx]]);
        }
        ans = max(ans, curCharIdx - left+1);
        chPos[s[curCharIdx]] = curCharIdx+1;
    }
    return ans;
}

int lengthOfLongestSubstringV2(string s){
    int len = s.length();
    unordered_set<char> chSet;
    int ans = 0, left = 0, right = 0;
    while(left < len && right < len){
        if(chSet.find(s[right]) == chSet.end()){
            chSet.insert(s[right++]);
            ans = max(ans, right-left);
        }else{
            chSet.erase(s[left++]);
        }
    }
    return ans;
}
```
