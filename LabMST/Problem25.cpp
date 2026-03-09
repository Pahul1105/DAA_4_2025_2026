class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* start=head;
        ListNode* end=head;
        for(int i=0;i<k;i++){
            if(!end) return head;
            end=end->next;
        }
        ListNode* prev=NULL;
        ListNode* curr=start;
        while(curr!=end){
            ListNode* next=curr->next;
            curr->next=prev;
            prev=curr;
            curr=next;
        }
        start->next = reverseKGroup(end, k);
        return prev;
    }
};
