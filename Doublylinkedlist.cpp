#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* prev;
    Node* next;
    Node(int val) {
        data=val;
        prev=nullptr;
        next=nullptr;
    }
};
void addFirst(Node*& head, int val) {
    Node* newNode=new Node(val);
    if (head) {
        head->prev=newNode;
        newNode->next=head;
    }
    head=newNode;
}
void addLast(Node*& head, int val) {
    Node* newNode = new Node(val);
    if (!head){
        head=newNode;
        return;
    }
    Node* temp=head;
    while (temp->next) {
        temp=temp->next;
    }
    temp->next=newNode;
    newNode->prev=temp;
}
void addMiddle(Node* head, int val, int pos) {
    if (pos <= 1 || !head)
     return;
    Node* newNode=new Node(val);
    Node* temp=head;
    for (int i=1;i<pos-1&&temp->next;i++){
        temp = temp->next;
    }
    newNode->next=temp->next;
    newNode->prev=temp;
    if (temp->next)
        temp->next->prev=newNode;
    temp->next=newNode;
}
void deleteFirst(Node*& head) {
    if (!head) return;
    Node* temp=head;
    head=head->next;
    if (head)
        head->prev=nullptr;
    delete temp;
}
void deleteLast(Node*& head) {
    if (!head) return;
    if (!head->next) {
        delete head;
        head=nullptr;
        return;
    }
    Node* temp=head;
    while (temp->next) {
        temp=temp->next;
    }
    temp->prev->next=nullptr;
    delete temp;
}
void showList(Node* head) {
    Node* temp=head;
    while (temp) {
        cout <<temp->data<< " -> ";
        temp =temp->next;
    }
    cout << "NULL" << endl;
}
