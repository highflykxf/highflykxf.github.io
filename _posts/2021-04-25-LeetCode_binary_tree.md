---
layout: post
title: "LeetCode-二叉树"
date: 2021-04-25
description: "LeetCodes刷题汇总-二叉树"
tags: 算法
---

## 二叉树

### 遍历方式汇总

```
struct TreeNode{
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

/*
递归
递归的思路较为简单：先判断递归的终止条件，然后根据遍历的顺序嵌套访问各边的子树;
*/
void preOrder(TreeNode *root, vector<int> &path){
    if(root==nullptr){
        return;
    }
    path.push_back(root->val);
    preOrder(root->left);
    preOrder(root->right);
}
/*
非递归
递归的底层其实就是维护了一个函数调用栈，非递归遍历二叉数最简单的实现方式就是借助栈来实现。
*/
//中序遍历
vector<int> inOrder(TreeNode *root){
    vector<int> path;
    if(root==nullptr){
        return path;
    }
    stack<TreeNode*> st;
    TreeNode* cur = root;
    while(!st.empty()||cur){
        //一直遍历到左子树最下边，边遍历边保存根节点到栈中。
        while(cur){
            st.push(cur);
            cur = cur->left;
        };
        //当cur==nullptr,说明已经达到左子树最下边，这时需要出栈了;
        if(!st.empty()){
            cur = st.top();
            st.pop();
            cout<<cur->val;
            path.push_back(cur->val);
            //进入右子树，开始新一轮的左子树遍历
            cur = cur->right;         
        }
    }
}
//先序遍历
vector<int> preOrder(TreeNode *root){
    vector<int> path;
    if(root==nullptr){
        return path;
    }
    stack<TreeNode*> st;
    TreeNode* cur = root;
    while(cur){
        cout<<cur->val;
        path.push_back(cur->val);
        st.push(cur);
        cur = cur->left;
    }
    if(!st.empty()){
        cur = st.top();
        st.pop();
    }
}
```

### 124. 二叉树的最大路径和

-- C++
```
int getMax(TreeNode* root, int &maxSum){
    if(root==nullptr){
        return 0;
    }
    int left=max(0,getMax(root->left, maxSum));
    int right=max(0,getMax(root->right, maxSum));
    maxSum = max(maxSum, left+right+root->val);
    return root->val+max(left,right);
}

int maxPathSum(TreeNode* root) {
    int maxSum = INT_MIN;
    getMax(root, maxSum);
    return maxSum;
}
```

-- Python
```
class Solution:
    def __init__(self):
        self.maxSum = float("-inf")

    def maxPathSum(self, root: TreeNode) -> int:
        def getMax(self, node: TreeNode):
            if not node:
                return 0

            left = max(0, getMax(self, node.left))
            right = max(0, getMax(self, node.right))
            lr = left + right + node.val
            self.maxSum = max(self.maxSum, lr)
            return node.val + max(left, right)

        getMax(self, root)
        return self.maxSum
```

### 105. 从前序与中序遍历序列构造二叉树

-- C++
```
TreeNode* recurrent(vector<int>& preorder,int preL,int preR,vector<int>& inorder,int inL,int inR){
    if(preR<preL||inR<inL){
        return nullptr;
    }
    TreeNode* curRoot = new TreeNode(preorder[preL]);
    int idx = inL;
    while(idx <= inR){
        if(inorder[idx]==preorder[preL]){
            break;
        }
        idx++;
    }
    curRoot->left = recurrent(preorder,preL+1,preL+idx-inL,inorder,inL,idx-1);
    curRoot->right = recurrent(preorder,preR-(inR-idx-1),preR,inorder,idx+1,inR);
    return curRoot;
}
TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    int preLen = preorder.size(), inLen = inorder.size();
    return recurrent(preorder,0,preLen-1,inorder,0,inLen-1);
}
```
