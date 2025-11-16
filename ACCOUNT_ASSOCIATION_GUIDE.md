# 📝 Account Association - Hướng dẫn chi tiết

## Trạng thái hiện tại

Bạn đã submit URL: `base-miniapp-vote.vercel.app`

Status:
- ✅ Domain matches
- ⚠️ Signature: Missing (cần verify)

## Các bước tiếp theo

### Bước 1: Click "Verify" và Sign

1. **Click nút "Verify"** trên trang Base.dev
2. **Wallet sẽ popup** để sign message
3. **Sign message** với wallet của bạn
4. **Sau khi sign**, bạn sẽ thấy 3 checkmarks xanh:
   - ✅ Account associated
   - ✅ Domain matches  
   - ✅ Signature

### Bước 2: Copy Account Association

Sau khi verify thành công, bạn sẽ thấy một object như này:

```json
{
  "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
  "payload": "eyJkb21haW4iOiJiYXNlLW1pbmlhcHAtdm90ZS52ZXJjZWwuYXBwIn0",
  "signature": "0x123abc..."
}
```

**Copy toàn bộ object này!**

### Bước 3: Update minikit.config.ts

1. **Mở file**: `mini-app/minikit.config.ts`

2. **Paste** accountAssociation vào:

```typescript
accountAssociation: {
  header: "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0", // Paste từ tool
  payload: "eyJkb21haW4iOiJiYXNlLW1pbmlhcHAtdm90ZS52ZXJjZWwuYXBwIn0", // Paste từ tool
  signature: "0x123abc..." // Paste từ tool
}
```

### Bước 4: Commit và Push

```bash
git add minikit.config.ts
git commit -m "Add account association for Mini App verification"
git push
```

### Bước 5: Verify lại

Sau khi Vercel redeploy:

1. **Check manifest**: https://base-miniapp-vote.vercel.app/.well-known/farcaster.json
2. **Verify** accountAssociation có đầy đủ header, payload, signature
3. **Check lại trên Base.dev tool** - should thấy 3 checkmarks xanh

## 🎯 Kết quả mong đợi

Sau khi hoàn thành:
- ✅ Account associated
- ✅ Domain matches
- ✅ Signature verified
- ✅ Manifest có accountAssociation
- ✅ App có thể được import vào Base Build

## ⚠️ Lưu ý

- **Account Association** phải được sign với wallet của Base account
- **Domain** phải match chính xác với deployed URL
- **Redeploy** sau khi update manifest
- **Wait vài phút** sau khi redeploy để indexing

## 🔗 Links

- **Account Association Tool**: https://www.base.dev/preview?tab=account
- **App URL**: https://base-miniapp-vote.vercel.app/
- **Manifest**: https://base-miniapp-vote.vercel.app/.well-known/farcaster.json



