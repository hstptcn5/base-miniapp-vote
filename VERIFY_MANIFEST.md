# ✅ Verify Manifest - Hướng dẫn

## Đã cập nhật

Account Association đã được thêm vào `minikit.config.ts`:
- ✅ header
- ✅ payload  
- ✅ signature

## Bước tiếp theo

### 1. Commit và Push

```bash
git add minikit.config.ts
git commit -m "Add account association for Mini App verification"
git push
```

### 2. Đợi Vercel Redeploy

- Vercel sẽ tự động build và deploy
- Đợi khoảng 1-2 phút để deployment hoàn tất

### 3. Verify Manifest

Sau khi deploy xong, check manifest:
```
https://base-miniapp-vote.vercel.app/.well-known/farcaster.json
```

Manifest should có:
```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjE0MTIwMzMs...",
    "payload": "eyJkb21haW4iOiJiYXNlLW1pbmlhcHAtdm90ZS52ZXJjZWwuYXBwIn0",
    "signature": "kqwlNueTf3pTXMrwsAp9LAaEmQehwI0pAEnyYM8Z8ZQ4v9qM+BMQjR/7fwfyqoiny8PKiBH/qmeh5F2pGJK4Lxs="
  },
  "miniapp": { ... }
}
```

### 4. Verify lại trên Base.dev

1. **Refresh** trang Base.dev Account Association tool
2. **Click "Update account association"** hoặc **Submit lại URL**
3. Tool sẽ verify manifest và should thấy:
   - ✅ Account associated
   - ✅ Domain matches
   - ✅ Signature

## ⚠️ Nếu vẫn không match

### Check 1: Manifest có đúng format không?

Verify manifest có đúng structure:
- `accountAssociation` ở root level
- `header`, `payload`, `signature` đều có giá trị (không empty)

### Check 2: Cache issue?

- Clear browser cache
- Hoặc dùng incognito mode
- Hoặc wait thêm vài phút cho CDN cache update

### Check 3: URLs đúng chưa?

Verify `homeUrl`, `iconUrl`, etc. đều dùng `https://base-miniapp-vote.vercel.app` chứ không phải `localhost:3000`

## 🎯 Expected Result

Sau khi verify thành công trên Base.dev:
- ✅ 3 checkmarks xanh
- ✅ App có thể được import vào Base Build
- ✅ App sẽ xuất hiện trong Base App/Farcaster

