#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

long long operations = 0;
int depth = 0;

void complexRec(int n, int currentDepth)
{
    if (currentDepth > depth)
        depth = currentDepth;

    if (n <= 2)
    {
        operations++;
        return;
    }

    int p = n;
    while (p > 0)
    {
        operations++;

        vector<int> arr(n);
        for (int i = 0; i < n; i++)
        {
            arr[i] = i ^ p;
            operations++;
        }
        p >>= 1;
    }

    vector<int> sq(n);
    for (int i = 0; i < n; i++)
    {
        sq[i] = i * i;
        operations++;
    }

    reverse(sq.begin(), sq.end());
    operations += n;

    complexRec(n / 2, currentDepth + 1);
    complexRec(n / 2, currentDepth+1);
    complexRec(n / 2, currentDepth + 1);
}

int main()
{
    int n;
    cin >> n;

    auto start = high_resolution_clock::now();

    complexRec(n, 1);

    auto stop = high_resolution_clock::now();
    auto timeTaken = duration_cast<milliseconds>(stop - start);

    cout << "\nOperations: "<<operations<<endl;
    cout << "Recursion Depth: " << depth << endl;
    cout <<"Time taken: " << timeTaken.count() << " ms" << endl;

    return 0;
}


// RECURRANCE RELATION IS T(n) = 3T(n/2) + (n(logn+1))
/* Case 1 of master theorem  - 
   (nlogn) grows slower than n^{1.585}
   Final Time Complexity - O(n^{1.585})
*/




