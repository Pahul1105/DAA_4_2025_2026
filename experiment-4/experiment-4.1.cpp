#include <bits/stdc++.h>
using namespace std;
#define MAX 1000
int heap[MAX], heapSize = 0;
void heapifyUp(int i){
    while(i>0&& heap[(i-1)/2]>heap[i]){
        swap(heap[i], heap[(i-1)/2]);
        i=(i-1)/2;
    }
}
void heapifyDown(int i){
    int smallest = i,left=2*i+1, right=2*i+2;
    if(left < heapSize && heap[left] < heap[smallest]) 
    smallest=left;
    if(right<heapSize && heap[right] < heap[smallest]) 
    smallest=right;
    if(smallest != i){
        swap(heap[i], heap[smallest]);
        heapifyDown(smallest);
    }
}

void buildHeap(){
    for(int i=(heapSize-2)/2;i>=0;i--) heapifyDown(i);
}

void deleteNode(int i){
    if(i >= heapSize) return;
    heap[i]=heap[heapSize-1];
    heapSize--;
    if(i>0 &&heap[i]<heap[(i-1)/2]) heapifyUp(i);
    else heapifyDown(i);
}
void printHeap(){
    for(int i=0;i<heapSize;i++) cout<<heap[i]<< " ";
    cout << "\n";
}
int main(){
    int n;
    cin >> n;
    for(int i = 0; i < n; i++) cin >> heap[i];
    heapSize = n;
    buildHeap();
    int q;
    cin >> q;
    while(q--){
        string cmd;
        cin >> cmd;
        if(cmd == "delete"){
            int i;
            cin >> i;
            deleteNode(i);
        } else if(cmd == "deleteMin") deleteNode(0);
        else if(cmd == "print") printHeap();
    }
    return 0;
}
/*
sample input/output - 
5                   //input
10 20 5 30 1        //input
5                   //input
print               //input
1 10 5 30 20     //output
deleteMin           //input
print               //input
5 10 20 30       //output
delete 2            //input
print               //input
5 10 30          //output
*/
