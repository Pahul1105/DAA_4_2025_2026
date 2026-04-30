#include<iostream>
using namespace std;
struct Node{
    int data;
    Node* next;
    Node(int x){
        data = x;
        next = NULL;
    }
};
class Stack{
    Node* top;
public:
    Stack(){
        top = NULL;
    }
    void push(int x){
        Node*temp=new Node(x)
        temp->next=top;
        top=temp;
    }
    void pop(){
        if(top==NUll) return;
        Node* temp=top;
        top=top->next;
        delete temp;
    }
    void peek(){
        if(top==NULL) return;
        cout<<top->data<<endl;
    }
    void display(){
        Node* temp=top;
        while(temp!=NULL){
            cout<<temp->data<<" ";
            temp=temp->next;
        }
        cout<<endl;
    }
};
int main(){
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    s.display(); 
    s.peek(); 
    s.pop();
    s.display();
    return 0;
}
