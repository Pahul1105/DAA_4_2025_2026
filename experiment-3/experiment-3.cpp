#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin>>n;
    unordered_map<int, int> mp;
    mp[0]=-1;
    int sum=0;
    int max_length=0;   
    for(int i=0;i<n;i++){
        char status;
        cin>>status;
        
        if(status=='P'){
            sum+=1;
        } 
        else if(status=='A'){
            sum-=1;
        }
        if(mp.find(sum)!=mp.end()){
            int length=i-mp[sum];
            if(length>max_length) {
                max_length=length;
            }
        } 
        else{
            mp.insert({sum, i});
        }
    }
    cout<<max_length<<endl;
    return 0;
}
