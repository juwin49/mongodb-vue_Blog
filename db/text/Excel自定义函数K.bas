Attribute VB_Name = "Ä£¿é2"
Function K(A, ByVal Range1 As Range)
   I = 0
   For Each D In Range1
   I = I + 1
   If D.Value = A Then
   Exit For
   End If
   Next
   K = I - 1
End Function


