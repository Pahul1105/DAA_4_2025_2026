class Solution {
  public:
    bool canPaint(vector<int>& arr,int k,long long mid) {
        long long sum=0;
        int painters=1;
        for (int i=0;i<arr.size();i++) {
            if (sum+arr[i] <= mid) {
                sum += arr[i];
            } 
            else{
                painters++;
                sum=arr[i];
            }
            if (painters>k)
                return false;
        }
        return true;
    }
    int minTime(vector<int>& arr,int k) {
        long long low=*max_element(arr.begin(), arr.end());
        long long high=0;
        for (int x:arr) high += x;
        long long ans = high;
        while (low<=high) {
            long long mid=low+(high-low)/2;
            if (canPaint(arr,k,mid)) {
                ans=mid;      
                high=mid-1;
            } else{
                low=mid+1;
            }
        }
        return (int)ans;
    }
};
