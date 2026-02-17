#include <iostream>
#include <vector>
using namespace std;
int lowerBound(vector<int>& nums,int target) {
    int l=0;
    int h=nums.size()-1;
    int ans=nums.size();
    while (l<=h){
        int mid=(l+h)/2;
        if (nums[mid]>=target) {
            ans=mid;
            h=mid-1;
        }
        else{
            l=mid+1;
        }
    }
    return ans;
}
int upperBound(vector<int>& nums,int target) {
    int l= 0;
    int h=nums.size()-1;
    int ans=nums.size();
    while (l<=h) {
        int mid=(l+h)/2;
        if (nums[mid]>target) {
            ans=mid;
            h=mid-1;
        } 
        else{
            l=mid+1;
        }
    }
    return ans;
}
int binarySearch(vector<int>& nums,int target) {
    int l=0;
    int h=nums.size()-1;
    while (l<=h) {
        int mid=(l+h)/2;
        if (nums[mid]==target)
            return mid;
        else if(nums[mid]<target)
            l=mid+1;
        else
            h=mid-1;
    }
    return -1;
}
int main() {
    vector<int> nums = {1, 2, 2, 2, 4, 5, 6};
    int target = 2;
    cout << "Search Index: "<<binarySearch(nums,target)<<endl;
    int count =upperBound(nums, target)-lowerBound(nums, target);
    cout << "Occurrences: " << count << endl;
    return 0;
}
/*
Output - 
Search Index: 3
Occurences: 3
*/
