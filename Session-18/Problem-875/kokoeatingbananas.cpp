class Solution {
public:
    bool possible(vector<int>& piles,int h, int mid) {
        long long cnt=0;
        for(int i=0;i<piles.size();i++) {
            cnt+=piles[i]/mid;
            if (piles[i]%mid!=0)
                cnt++;    
        }
        return cnt <= h;
    }
    int minEatingSpeed(vector<int>& piles,int h) {
        int low=1;
        int high=*max_element(piles.begin(), piles.end());
        while (low<high) {
            int mid=low+(high-low)/2;
            if (possible(piles,h,mid))
                high=mid;     
            else
                low=mid+1;  
        }
        return low;
    }
};
